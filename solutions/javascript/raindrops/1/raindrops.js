/* eslint-disable linebreak-style */
export default class Raindrops {
  convert(count) {
    return Raindrops.pling(count) + Raindrops.plang(count) + Raindrops.plong(count) || `${count}`;
  }

  static pling(count) {
    return (!(count % 3) && 'Pling') || '';
  }

  static plang(count) {
    return (!(count % 5) && 'Plang') || '';
  }

  static plong(count) {
    return (!(count % 7) && 'Plong') || '';
  }
}
