const checkIsAdmin = async (interaction) => {
    return await interaction.member.roles.cache.some((role) => role.name === 'perms');
};
  
const checkIsSuperuser = async (interaction) => {
    return await interaction.member.roles.cache.some((role) => role.name === 'all perms xDD');
};
  
module.exports = { checkIsAdmin, checkIsSuperuser };