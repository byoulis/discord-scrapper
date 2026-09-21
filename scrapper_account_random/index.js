const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const moment = require('moment');
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
  } catch (err) {
    console.log('Não foi possível buscar todos os membros. Apenas os disponíveis no cache serão usados.');
  }

  const filteredMembers = guild.members.cache.filter(member => {
    const createdAt = member.user.createdAt;
    const year = createdAt.getFullYear();

    return year >= 2020 && year <= 2025;
  });

  console.log(`Encontrados ${filteredMembers.size} membros válidos.`);

  const lines = [];

  filteredMembers.forEach(member => {
    const username = member.user.tag;
    const badges = member.user.flags?.toArray().join(', ') || 'Nenhuma';
    const createdAt = moment(member.user.createdAt).format('YYYY-MM-DD');

    lines.push(`Username: ${username} | Badges: ${badges} | Criado em: ${createdAt}`);
  });

  const fileName = `${safeGuildName || 'servidor_desconhecido'}.txt`;
  fs.writeFileSync(fileName, lines.join('\n'));
  console.log(`Arquivo "${fileName}" criado com sucesso.`);

  process.exit();
});

client.login(token);