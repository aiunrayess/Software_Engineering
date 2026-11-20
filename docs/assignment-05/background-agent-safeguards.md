<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:ef4069423cba1045d56745509a68a7c359bde926bd0fb423f7181ba7f67ce0a1 -->

# Hypothetical asynchronous task

No paid/background task was launched. Proposed task: add a missing end-time-edit browser regression check without changing business behavior.

- Isolation: create branch assignment05/browser-regression in a separate worktree from the reviewed final snapshot, after verifying a clean worktree. Never reuse the current branch for simultaneous writers.
- Allowed files: tests/browser-regression.* and docs/assignment-05/evidence/background/ only. Changes to package.json or source require a new reviewed scope.
- Allowed commands: read-only Git/search, node --version, npm test, npm run check, npm run build; loopback-only local HTTP server and existing browser runner. No installs or new providers.
- Budget: 20 minutes and one focused patch; stop on timeout, conflicts, unexpected files, unavailable browser, or failing baseline. Do not keep retrying provider failures.
- Forbidden: secrets, customer data, network uploads, paid services, remote pushes, merge, deployment, destructive operations, production access, history rewriting and dependency changes.
- Artifacts: base and final SHA, change summary, exact diff, commands with exit status, test log, build result, screenshot when applicable, risk notes and unexecuted checks. Never manufacture a pass.
- Gate: human inspects allowed paths, original acceptance criteria and actual evidence; reruns verify and browser regression before approving merge. Deployment needs separate approval.
- Failure: keep patch/logs for diagnosis; report blocker; leave main and release unchanged. Before merge discard only the isolated worktree through the approved cleanup workflow. After merge propose a normal revert commit and rerun gates; do not reset shared history. Rollback preserves the baseline source export.


<!-- /coderabbit-ai-generated:v1 -->