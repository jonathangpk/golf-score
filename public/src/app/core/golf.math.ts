export function getSpielvorgabe (hcp: number, slope: number, cr: number, par: number) {
  return Math.round(Math.max(-hcp, -36) * (slope / 113) - cr + par);
}
