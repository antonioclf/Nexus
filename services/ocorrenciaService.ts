
import { supabase } from '../supabaseClient';
import { Ocorrencia, OcorrenciaStatus } from '../types';

export const getOcorrencias = async (): Promise<Ocorrencia[]> => {
    const { data, error } = await supabase
        .from('ocorrencias')
        .select('*')
        .order('data', { ascending: false }); // Most recent first

    if (error) {
        console.error('Error fetching ocorrencias:', error);
        return [];
    }

    return data.map((o: any) => ({
        id: o.id,
        natureza: o.natureza,
        data: o.data,
        horarioInicio: o.horario_inicio,
        horarioFim: o.horario_fim,
        condutor: o.condutor,
        comandante: o.comandante,
        odometroInicial: Number(o.odometro_inicial),
        odometroFinal: Number(o.odometro_final),
        siadStatus: o.siad_status as OcorrenciaStatus,
        local: o.local,
        redsId: o.reds_id,
    }));
};

export const createOcorrencia = async (ocorrencia: Omit<Ocorrencia, 'id'>): Promise<Ocorrencia | null> => {
    // Map camelCase to snake_case for DB
    const dbOcorrencia = {
        natureza: ocorrencia.natureza,
        data: ocorrencia.data,
        horario_inicio: ocorrencia.horarioInicio,
        horario_fim: ocorrencia.horarioFim,
        condutor: ocorrencia.condutor,
        comandante: ocorrencia.comandante,
        odometro_inicial: ocorrencia.odometroInicial,
        odometro_final: ocorrencia.odometroFinal,
        siad_status: ocorrencia.siadStatus,
        local: ocorrencia.local,
        reds_id: ocorrencia.redsId,
    };

    const { data, error } = await supabase
        .from('ocorrencias')
        .insert([dbOcorrencia])
        .select()
        .single();

    if (error) {
        console.error('Error creating ocorrencia:', error);
        return null;
    }

    return {
        ...ocorrencia,
        id: data.id,
    };
};
