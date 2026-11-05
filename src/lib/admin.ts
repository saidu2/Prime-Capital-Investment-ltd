/**
 * Emails allowed to register and sign in as admin.
 * Add a new admin by adding their email here — they then just need to
 * create an account at /auth/register with that email + a password.
 */
export const ADMIN_EMAILS = [
  "safiyanusaidu2@gmail.com",
  "CyberDomm.uk@gmail.com",
] as const;

export function isAdminEmail(email: string) {
  return ADMIN_EMAILS.some(
    (adminEmail) => adminEmail.toLowerCase() === email.toLowerCase(),
  );
}
