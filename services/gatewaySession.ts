import type { ConsentScope, EducationSurface, GatewayRole } from '../types';

export interface AuthorizationBasis {
  schema: 'securedme.authorization_basis.v1';
  assignment_ref: string;
  authority_ref: string;
  subject_ref: string;
  assigned_class_refs: string[];
  purpose: 'learning' | 'teaching' | 'privacy_governance' | 'school_governance' | 'unassigned';
  decision: 'allow' | 'deny';
  human_authority_required: true;
}

export interface GatewaySessionV2 {
  schema: 'securedme.education.session.v2';
  session_id: string;
  identity_ref: string;
  role: GatewayRole | 'privacy_admin' | 'school_admin' | 'unassigned';
  age_band: string;
  surface: EducationSurface | 'governance' | 'unauthorized';
  authority_ref: string;
  subject_ref: string;
  assigned_class_refs: string[];
  consent_scope: ConsentScope;
  allowed_tools: string[];
  authorization_basis: AuthorizationBasis;
  auth_time: string;
  expires_at: string;
  csrf_token: string;
  contract_version: 'v2';
  raw_secret_stored: false;
}

export const gatewayBaseUrl = (import.meta.env.VITE_SECUREDME_GATEWAY_URL || 'https://gateway-dev.securedme.ca').replace(/\/$/, '');

export const loadGatewaySession = async (): Promise<GatewaySessionV2> => {
  const response = await fetch(`${gatewayBaseUrl}/api/v1/session`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(response.status === 401 ? 'session_required' : 'gateway_session_unavailable');
  }
  const session = (await response.json()) as GatewaySessionV2;
  const pilotRoles = new Set(['student_minor', 'student_adult', 'teacher']);
  if (
    session.schema !== 'securedme.education.session.v2' ||
    session.raw_secret_stored !== false ||
    session.authorization_basis?.decision !== 'allow' ||
    !session.allowed_tools?.includes('algoquest') ||
    !pilotRoles.has(session.role) ||
    !session.identity_ref ||
    new Date(session.expires_at).getTime() <= Date.now()
  ) {
    throw new Error('gateway_session_invalid');
  }
  return session;
};

export const beginGatewayLogin = (): void => {
  const returnTo = `${window.location.origin}/`;
  window.location.assign(`${gatewayBaseUrl}/auth/login?return_to=${encodeURIComponent(returnTo)}`);
};

export const endGatewaySession = async (session: GatewaySessionV2): Promise<void> => {
  const response = await fetch(`${gatewayBaseUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'X-CSRF-Token': session.csrf_token },
  });
  if (!response.ok) throw new Error('gateway_logout_failed');
};
