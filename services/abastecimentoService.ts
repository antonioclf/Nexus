
import { supabase } from '../supabaseClient';
import { Abastecimento } from '../types';

export const getAbastecimentosByViatura = async (viaturaId: string): Promise<Abastecimento[]> => {
    const { data, error } = await supabase
        .from('abastecimentos')
        .select('*')
        .eq('viatura_id', viaturaId)
        .order('data', { ascending: false });

    if (error) {
        console.error('Error fetching abastecimentos:', error);
        return [];
    }

    return data.map((a: any) => ({
        id: a.id,
        viaturaId: a.viatura_id,
        data: a.data,
        horario: a.horario,
        motorista: a.motorista,
        odometro: Number(a.odometro),
        notaFiscal: a.nota_fiscal,
        quantidade: Number(a.quantidade),
        precoPorLitro: Number(a.preco_por_litro),
        total: Number(a.total),
    }));
};

export const createAbastecimento = async (abastecimento: Omit<Abastecimento, 'id'>): Promise<Abastecimento | null> => {
    const dbAbastecimento = {
        viatura_id: abastecimento.viaturaId,
        data: abastecimento.data,
        horario: abastecimento.horario,
        motorista: abastecimento.motorista,
        odometro: abastecimento.odometro,
        nota_fiscal: abastecimento.notaFiscal,
        quantidade: abastecimento.quantidade,
        preco_por_litro: abastecimento.precoPorLitro,
        total: abastecimento.total,
    };

    const { data, error } = await supabase
        .from('abastecimentos')
        .insert([dbAbastecimento])
        .select()
        .single();

    if (error) {
        console.error('Error creating abastecimento:', error);
        return null;
    }

    return {
        ...abastecimento,
        id: data.id,
    };
};
