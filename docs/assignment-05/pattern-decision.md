<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:84292347758de79fac372e1eef7d172d8e70c5ba45451aefa188f0fe44a89703 -->

# Focused pattern decision

## Concrete concern
app.js contains DOM templates and event handlers, but the inherited project already separates pure filtering, booking rules and orchestration. The only repeated event callbacks are short render/evaluate calls. There is one fixed data source and one fixed policy.

## Alternatives evaluated
Strategy could select alternative booking policies, but no caller needs another policy. Adapter could wrap a remote catalog, but there is no remote provider. Both would add indirection without removing a current dependency problem. A standalone renderer abstraction would similarly enlarge the change for two local correctness fixes.

## Decision
No new pattern or structural refactoring is warranted (assignment Task 03 explicitly permits this decision). Retain the existing service boundary, which already resembles a small Facade. Do not claim it was introduced in Assignment 05. Reconsider Strategy only after a second independently varying booking policy is required.

## Before / after
Both: index.html -> app.js -> roomService.js -> filtering.js + bookingRules.js; app.js -> roomData.js. After: filter boundary validates attendee domain; time events call existing evaluate(). No dependency direction or public booking interface changes. All 21 original tests remain unedited except appending two filtering tests; final 23 pass. See acceptance-criteria.md and evidence/mitigation.diff.


<!-- /coderabbit-ai-generated:v1 -->