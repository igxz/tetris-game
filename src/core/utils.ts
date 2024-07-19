
/**
 * 根据最小值和最大值随机取得一个之间一个数 (无法取得最大值)
 * @param min 
 * @param max 
 * @returns 
 */
export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}
