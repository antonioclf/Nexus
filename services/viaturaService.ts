
import { supabase } from '../supabaseClient';
import { Viatura, ViaturaTipo } from '../types';

export const getViaturas = async (): Promise<Viatura[]> => {
    const { data, error } = await supabase
        .from('viaturas')
        .select('*')
        .order('prefixo', { ascending: true });

    if (error) {
        console.error('Error fetching viaturas:', error);
        return [];
    }

    return data.map((v: any) => ({
        ...v,
        // Ensure types match enum if necessary, or just cast
        tipo: v.tipo as ViaturaTipo,
        // Database might return numeric as string or number, ensure number
        odometro: Number(v.odometro),
        combustivel: Number(v.combustivel),
    }));
};

export const createViatura = async (viatura: Omit<Viatura, 'id'>): Promise<Viatura | null> => {
    const { data, error } = await supabase
        .from('viaturas')
        .insert([viatura])
        .select()
        .single();

    if (error) {
        console.error('Error creating viatura:', error);
        return null;
    }

    return data;
};

export const getViaturaById = async (id: string): Promise<Viatura | null> => {
    const { data, error } = await supabase
        .from('viaturas')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching viatura by id:', error);
        return null;
    }

    return {
        ...data,
        tipo: data.tipo as ViaturaTipo,
        odometro: Number(data.odometro),
        combustivel: Number(data.combustivel),
    };
};

export const updateViaturaStatus = async (id: string, status: string): Promise<boolean> => {
    const { error } = await supabase
        .from('viaturas')
        .update({ status })
        .eq('id', id);

    if (error) {
        console.error('Error updating viatura status:', error);
        return false;
    }
    return true;
};
