# Current platform review
- [x] Repair and verify guide download on desktop and mobile Chromium; native iOS share delivery implemented but not tested on an iPhone.
- [x] Add administrator-only name, welcome text, footer and guide settings with read-only assistant access.
- [x] Verify all home destinations, 38 department buttons, search inputs/selects, auth toggles and signed-in profile save/reload.
- [ ] Assign full management to the first supervisor (blocked: designated account email not supplied; do not infer from the available auth session).
- [ ] Verify administrator settings save/readback and extend management to projects, graduates and other content (blocked: identified first-supervisor account and management assignment).
- External Google sign-in and email delivery were not exercised; cannot claim every authentication button's external flow is verified.

# Supervisor registration update
- [x] Remove manual supervisor approval while preserving administrator restrictions.
- [x] Add first/second supervisor selection and display the saved selection.
- [x] Test registration permissions and the signed-in profile flow.

# Linked-page import
- [x] Import projects, graduates, advanced search, statistics, supervisor entry, and four linked project details.
- [x] Preserve local navigation and repair captured public-page controls.
- [x] Compare source and preview on desktop and phone; verify main navigation and search flows.
- [x] Connect supervisor accounts, profiles, and password recovery.
- [x] Restrict admin access to server-assigned supervisor roles and add safe sign-out.
- [x] Verify permission tests, signed-out redirects, invalid credentials, form validation, and desktop/phone navigation.
- [x] Verify signed-in supervisor access, profile saving/reload, sign-out, and protected redirect using the managed account session.
- Email recovery delivery remains unverified and outside the current registration update.
- [x] First-supervisor manual approval superseded by open supervisor registration.