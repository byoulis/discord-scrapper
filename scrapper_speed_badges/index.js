const { Client, UserFlags } = require('discord.js-selfbot-v13');
const fs = require('fs');
const readline = require('readline-sync');

console.clear();

const token = '';

const client = new Client();

client.on('ready', async () => {
  console.log(`Logado como: ${client.user.tag}`);

  await new Promise(resolve => setTimeout(resolve, 1000));

  const serverId = readline.question('Insira o ID do servidor: ');

  const guild = client.guilds.cache.get(serverId);
  if (!guild) {
    console.log('Servidor não encontrado ou você não está nele.');
    return process.exit();
  }

  const safeGuildName = guild.name
    .replace(/[\u{0080}-\u{FFFF}]/gu, '')
    .replace(/[^a-zA-Z0-9_\- ]/g, '');

  console.log(`Coletando membros do servidor: ${safeGuildName}`);

  try {
    await guild.members.fetch();
  } catch {
    console.log('Não foi possível buscar todos os membros. Usando cache disponível.');
  }

  const wantedBadges = [
    'HOUSE_BRAVERY',
    'HOUSE_BRILLIANCE',
    'HOUSE_BALANCE',
    'EARLY_SUPPORTER',
    'DISCORD_EMPLOYEE',
    'PARTNERED_SERVER_OWNER',
    'HYPESQUAD_EVENTS',
    'BUGHUNTER_LEVEL_1',
    'BUGHUNTER_LEVEL_2',
    'EARLY_VERIFIED_BOT_DEVELOPER',
    'DISCORD_CERTIFIED_MODERATOR',
  ];

  const filteredMembers = guild.members.cache.filter(member => {
    const badges = member.user.flags?.toArray() || [];
    return badges.some(badge => wantedBadges.includes(badge));
  });

  console.log(`Encontrados ${filteredMembers.size} membros com badges selecionadas.`);

  const lines = [];

  filteredMembers.forEach(member => {
    const username = member.user.tag;
    const badges = member.user.flags?.toArray().join(', ') || 'Nenhuma';
    const id = member.user.id;

    lines.push(`username: ${username} | badges: ${badges} | id: ${id}`);
  });

  const fileName = `${safeGuildName || 'servidor_desconhecido'}.txt`;
  fs.writeFileSync(fileName, lines.join('\n'), 'utf-8');

  console.log(`Arquivo "${fileName}" criado com sucesso.`);

  process.exit();
});

client.login(token);