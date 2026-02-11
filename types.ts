
export enum ViaturaTipo {
  ADMINISTRATIVA = 'Administrativa',
  SALVAMENTO = 'Salvamento',
  RESGATE = 'Resgate',
  SOCORRO = 'Socorro'
}

export enum OcorrenciaStatus {
  CONCLUIDO = 'Concluído',
  PENDENTE = 'Pendente',
  EM_CURSO = 'Em Curso'
}

export interface Viatura {
  id: string;
  prefixo: string;
  tipo: ViaturaTipo;
  placa: string;
  odometro: number;
  combustivel: number;
  status: 'Operacional' | 'Manutenção' | 'Empenhada';
  modelo: string;
}

export interface Ocorrencia {
  id: string;
  natureza: string;
  data: string;
  horarioInicio: string;
  horarioFim: string;
  condutor: string;
  comandante: string;
  odometroInicial: number;
  odometroFinal: number;
  siadStatus: OcorrenciaStatus;
  local: string;
  redsId: string;
}

export interface Abastecimento {
  id: string;
  data: string;
  horario: string;
  viaturaId: string;
  motorista: string;
  odometro: number;
  notaFiscal: string;
  quantidade: number;
  precoPorLitro: number;
  total: number;
}

export type ViewType = 'HOME' | 'OCORRENCIAS' | 'VIATURAS' | 'ESTATISTICAS' | 'PERFIL' | 'NOVA_VIATURA' | 'NOVO_ABASTECIMENTO' | 'DETALHE_VIATURA' | 'HISTORICO_ABASTECIMENTO';
