import roundToDecimals from './roundToDecimals';

// Generic pseudo-random ID generator.
// Good enough for now.
export default function getId() {
  return `${(new Date()).getTime()}-${roundToDecimals(Math.random() * 1000)}`;
}
