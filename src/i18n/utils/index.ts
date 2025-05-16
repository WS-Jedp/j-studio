export async function loadMessages(locale: string) {
  const introduction = (
    await import(`../../i18n/messages/${locale}/introduction.json`)
  ).default;
  const aboutJ = (await import(`../../i18n/messages/${locale}/about-j.json`))
    .default;
  const experience = (
    await import(`../../i18n/messages/${locale}/experience.json`)
  ).default;
  const personalInformation = (
    await import(`../../i18n/messages/${locale}/personal-information.json`)
  ).default;
  const coffiContainer = (
    await import(`../../i18n/messages/${locale}/coffi-project-container.json`)
  ).default;
  const contact = (
    await import(`../../i18n/messages/${locale}/contact.json`)
  ).default;
  const skills = (
    await import(`../../i18n/messages/${locale}/skills.json`)
  ).default;
  const beereaders = (
    await import(`../../i18n/messages/${locale}/beereaders.json`)
  ).default;
  const certiblock = (
    await import(`../../i18n/messages/${locale}/certiblock.json`)
  ).default;
  const worldskills = (
    await import(`../../i18n/messages/${locale}/worldskills.json`)
  ).default;
  const platziMasters = (
    await import(`../../i18n/messages/${locale}/platzi-master.json`)
  ).default;
  const coffiPage = (
    await import(`../../i18n/messages/${locale}/coffi-project-page.json`)
  ).default;


  return {
    introduction,
    "about-j": aboutJ,
    experience,
    "personal-information": personalInformation,
    "coffi-container": coffiContainer,
    contact,
    skills,
    beereaders,
    certiblock,
    worldskills,
    "platzi-master": platziMasters,
    "coffi-page": coffiPage
  };
}
