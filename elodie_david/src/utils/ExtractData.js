export function ExtractTemps(data) {
  let array = [];
  for (let i = 0; i < 5; i++) {
    array.push(data.daily[i].temp.day);
  }

  return array;
}

export function ExtractHum(data) {
  let array = [];
  for (let i = 0; i < 5; i++) {
    array.push(data.daily[i].humidity);
  }

  return array;
}

