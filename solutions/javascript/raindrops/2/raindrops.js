export function convert(count) {
  return pling(count) + plang(count) + plong(count) || `${count}`;
}

function pling(count) {
  return (!(count % 3) && 'Pling') || '';
}

function plang(count) {
  return (!(count % 5) && 'Plang') || '';
}

function plong(count) {
  return (!(count % 7) && 'Plong') || '';
}
