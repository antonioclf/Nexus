
import { Viatura, ViaturaTipo, Ocorrencia, OcorrenciaStatus, Abastecimento } from './types';

export const INITIAL_VIATURAS: Viatura[] = [
  { id: '1', prefixo: 'UR-1502', tipo: ViaturaTipo.RESGATE, placa: 'MGB-1234', odometro: 45215, combustivel: 75, status: 'Operacional', modelo: 'Mercedes-Benz Sprinter 415' },
  { id: '2', prefixo: 'ABTS-1205', tipo: ViaturaTipo.SOCORRO, placa: 'ABC-5678', odometro: 12450, combustivel: 90, status: 'Empenhada', modelo: 'Volkswagen Constellation' },
  { id: '3', prefixo: 'VP-0112', tipo: ViaturaTipo.ADMINISTRATIVA, placa: 'OFF-1234', odometro: 8900, combustivel: 60, status: 'Operacional', modelo: 'Toyota Hilux' },
  { id: '4', prefixo: 'ABS-0123', tipo: ViaturaTipo.SALVAMENTO, placa: 'HGT-9876', odometro: 22100, combustivel: 45, status: 'Manutenção', modelo: 'Ford F-4000' },
];

export const INITIAL_OCORRENCIAS: Ocorrencia[] = [
  { 
    id: '1', 
    natureza: 'Salvamento Terrestre', 
    data: '14 Fev 2024', 
    horarioInicio: '08:30', 
    horarioFim: '10:15', 
    condutor: 'Sgt. Silva', 
    comandante: '2º Sgt Almeida', 
    odometroInicial: 45200, 
    odometroFinal: 45215, 
    siadStatus: OcorrenciaStatus.CONCLUIDO, 
    local: 'Rodovia BR-491, Km 23 - Zona Rural',
    redsId: '2024-004321-001'
  },
  { 
    id: '2', 
    natureza: 'APH - Atendimento Clínico', 
    data: '14 Fev 2024', 
    horarioInicio: '11:05', 
    horarioFim: '11:45', 
    condutor: 'Cabo Oliveira', 
    comandante: '3º Sgt Ferreira', 
    odometroInicial: 12400, 
    odometroFinal: 12450, 
    siadStatus: OcorrenciaStatus.CONCLUIDO, 
    local: 'Rua Norberto Ribeiro da Silva, 450',
    redsId: '2024-004325-001'
  },
  { 
    id: '3', 
    natureza: 'Incêndio em Vegetação', 
    data: '13 Fev 2024', 
    horarioInicio: '14:20', 
    horarioFim: '17:50', 
    condutor: 'Cabo Mendonça', 
    comandante: 'Cabo Mendonça', 
    odometroInicial: 22000, 
    odometroFinal: 22100, 
    siadStatus: OcorrenciaStatus.PENDENTE, 
    local: 'Trevo de Guaranésia',
    redsId: '2024-004330-001'
  },
];

export const INITIAL_ABASTECIMENTOS: Abastecimento[] = [
  { id: '1', viaturaId: '1', data: '15 Out 2023', horario: '08:45', motorista: 'Sgt. Albuquerque', odometro: 45892, notaFiscal: '88392', quantidade: 78.5, precoPorLitro: 5.73, total: 450.00 },
  { id: '2', viaturaId: '1', data: '08 Out 2023', horario: '14:20', motorista: 'Cb. Martins', odometro: 45210, notaFiscal: '88211', quantidade: 66.3, precoPorLitro: 5.73, total: 380.20 },
];
