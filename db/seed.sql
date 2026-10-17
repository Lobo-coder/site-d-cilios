-- =====================================================================
-- D Cílios: dados iniciais.
-- Endereço, WhatsApp e horário de funcionamento vieram do Google Maps / Instagram.
-- ATENÇÃO: profissionais, serviços, preços e durações são EXEMPLOS para a demonstração.
-- Confirme com o estúdio e ajuste aqui (ou pelo painel) antes de ir ao ar.
-- =====================================================================

update configuracoes set
  nome_negocio       = 'D Cílios',
  slogan             = 'Tambaú · João Pessoa',
  hero_titulo        = 'Cílios elegantes, com hora marcada.',
  hero_subtitulo     = 'Extensão de cílios, lash lifting e sobrancelhas. Escolha o serviço e o horário livre, sem esperar resposta no WhatsApp.',
  sobre              = 'Cílios elegantes e saudáveis. Eleita a melhor empresa de cílios de João Pessoa, com mais de 25 mil atendimentos.',
  whatsapp           = '5583996446518',
  instagram          = 'dciliosesobrancelhas',
  endereco           = 'Av. Nego, 875 (Ed. One Way) – Tambaú, João Pessoa – PB',
  aviso_agendamento  = 'Venha sem maquiagem nos olhos. Para remarcar ou cancelar, avise com pelo menos 24 horas de antecedência.',
  intervalo_minutos  = 0,
  passo_minutos      = 30,
  antecedencia_horas = 2,
  janela_dias        = 60,
  rotulo_recurso     = 'Profissional',
  msg_agendamento    = 'Olá! Acabei de agendar [SERVIÇO] para [DATA], às [HORÁRIO], pelo site. Meu nome é [NOME].',
  msg_lembrete       = 'Oi, [NOME]! Passando para lembrar do seu horário na D Cílios: [SERVIÇO], [DATA] às [HORÁRIO]. Venha sem maquiagem nos olhos. Te esperamos!'
where id = 1;

-- Horário do Google Maps: terça a sexta 08:30–18:30, sábado 09:00–17:00, domingo e segunda fechado.
update horarios_funcionamento set atende = true,  abre = '08:30', fecha = '18:30' where dia_semana between 2 and 5;
update horarios_funcionamento set atende = true,  abre = '09:00', fecha = '17:00' where dia_semana = 6;
update horarios_funcionamento set atende = false where dia_semana in (0, 1);

insert into recursos (nome, ordem)
select * from (values
  ('Lash Designer 1',         1),
  ('Lash Designer 2',         2),
  ('Designer de Sobrancelhas', 3)
) as v(nome, ordem)
where not exists (select 1 from recursos);

insert into servicos (nome, descricao, preco_centavos, duracao_minutos, ordem)
select * from (values
  ('Extensão fio a fio',             'Um fio sintético em cada cílio natural. Efeito natural e alongado.',  18000, 120, 1),
  ('Volume brasileiro',              'Fios em Y para mais volume, ainda leve e confortável.',                20000, 120, 2),
  ('Volume russo',                   'Leques de fios ultrafinos para um olhar marcante.',                    23000, 150, 3),
  ('Manutenção de cílios',           'Reposição dos fios. Até 21 dias depois da aplicação.',                 12000,  90, 4),
  ('Lash lifting',                   'Curvatura e tintura dos seus próprios cílios, sem extensão.',          12000,  60, 5),
  ('Remoção de extensão',            'Retirada segura, sem danificar os fios naturais.',                      4000,  30, 6),
  ('Design de sobrancelhas',         'Desenho e modelagem de acordo com o seu rosto.',                        4500,  30, 7),
  ('Design com henna',               'Design + henna para preencher falhas e dar definição.',                 6500,  60, 8),
  ('Brow lamination',                'Fios alinhados e penteados para cima, efeito sobrancelha cheia.',      13000,  60, 9)
) as v(nome, descricao, preco_centavos, duracao_minutos, ordem)
where not exists (select 1 from servicos);

-- cílios com as lash designers, sobrancelhas com a designer de sobrancelhas
insert into servico_recursos (servico_id, recurso_id)
select s.id, r.id from servicos s join recursos r
  on (r.nome like 'Lash%'      and s.nome !~* '(sobrancelha|henna|brow)')
  or (r.nome like 'Designer%'  and s.nome  ~* '(sobrancelha|henna|brow)')
on conflict do nothing;
