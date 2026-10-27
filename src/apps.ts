export interface DailyApp {
  id: string;
  floor: number;
  name: string;
  emoji: string;
  url: string;
  shortDescription: string;
  themeColor: string;
  travelMessage: string;
}

export const apps: DailyApp[] = [
  { id: 'space', floor: 1, name: 'Carrera Espacial', emoji: '🚀', url: 'https://hellodailymeet.netlify.app/', shortDescription: 'Houston, tenemos una daily.', themeColor: '#526b9c', travelMessage: 'Preparando el despegue. Que el sprint te acompañe.' },
  { id: 'crickets', floor: 2, name: 'Apnea de Grillos', emoji: '🦗', url: 'https://apneadegrillos.netlify.app/', shortDescription: 'El silencio también participa.', themeColor: '#427669', travelMessage: 'Descendiendo a profundidades poco recomendables.' },
  { id: 'asparagus', floor: 3, name: 'Concurso de Frituras de Espárragos', emoji: '🥦', url: 'https://freiresparragos.netlify.app/', shortDescription: 'La daily está que arde.', themeColor: '#91733c', travelMessage: 'Próxima parada: gastronomía corporativa de alto riesgo.' },
  { id: 'thrones', floor: 4, name: 'Game of Dailies', emoji: '🐉', url: 'https://gameofdailies.netlify.app/', shortDescription: 'Un sprint. Cinco reinos. Cero piedad.', themeColor: '#884c40', travelMessage: 'El invierno llega. Tu turno también.' },
  { id: 'oracle', floor: 5, name: 'Pitonisa Daily', emoji: '🔮', url: 'https://pitonisadaily.netlify.app/', shortDescription: 'Tu futuro tiene un bloqueo.', themeColor: '#79618b', travelMessage: 'Las estrellas saben que no terminaste el ticket.' },
];
