// Dados e regras SIMULADOS (simplificados) — confirmar sempre no CRAS.
const SM=1621; // salário mínimo de referência
const BENEFICIOS=[
 {id:"bolsa",nome:"Bolsa Família",oQue:"Ajuda mensal em dinheiro para famílias de baixa renda.",
  regra:r=>r.pc<=218, motivo:"a renda por pessoa da casa está dentro do limite de R$ 218.",
  passos:["Separe CPF e RG de todas as pessoas da casa.","Vá ao CRAS mais perto e faça ou atualize o CadÚnico.","Acompanhe a resposta pelo aplicativo Bolsa Família.","Mantenha vacinas e escola das crianças em dia."]},
 {id:"tarifa",nome:"Tarifa Social de Energia",oQue:"Desconto na conta de luz para famílias de baixa renda.",
  regra:r=>r.pc<=SM/2&&r.cad!=='nao'||r.bpc, motivo:"a renda é baixa e você está no CadÚnico (ou pode entrar).",
  passos:["Tenha o CadÚnico atualizado.","Separe uma conta de luz recente.","Peça o desconto na distribuidora de energia ou confirme se já foi aplicado.","Confira o desconto na próxima conta."]},
 {id:"bpc",nome:"BPC (Benefício de Prestação Continuada)",oQue:"Um salário mínimo por mês para idosos (65+) ou pessoas com deficiência de baixa renda.",
  regra:r=>(r.idoso||r.def)&&r.pc<=SM/4, motivo:"há idoso ou pessoa com deficiência e a renda por pessoa é muito baixa.",
  passos:["Faça ou atualize o CadÚnico no CRAS.","Separe documentos com foto, CPF e comprovante de residência.","Agende pelo aplicativo Meu INSS ou pelo telefone 135.","Compareça à avaliação no dia marcado."]}
];
const GLOSSARIO={"CadÚnico":"Cadastro Único. É a lista do governo que reúne as famílias de baixa renda. Quase todo benefício começa por ele.","CRAS":"Centro de Referência de Assistência Social. É o lugar público e gratuito, perto de casa, onde você faz o CadÚnico e tira dúvidas.","BPC":"Benefício de Prestação Continuada. Paga um salário mínimo por mês a idosos e pessoas com deficiência de baixa renda.","Renda por pessoa":"A soma do que todos da casa ganham, dividida pelo número de pessoas."};
