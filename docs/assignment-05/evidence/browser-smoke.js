(() => {
  const results = [];
  const assert = (name, ok) => {
    results.push({name, passed: !!ok});
    if (!ok) throw new Error(name);
  };
  const set = (id, value) => {
    const el = document.getElementById(id);
    el.value = value;
    el.dispatchEvent(new Event('input', {bubbles: true}));
  };
  const result = () => document.getElementById('result').textContent;
  assert('default available', result().startsWith('Available'));
  set('start', '630');
  assert('time edit refreshes overlap', result().includes('overlaps'));
  set('start', '660');
  assert('touching endpoint available', result().startsWith('Available'));
  for (const value of ['', '0', '-1', '1.5']) {
    set('attendees', value);
    assert('invalid attendees ' + JSON.stringify(value), document.querySelectorAll('.room-card').length === 0 && document.getElementById('attendees').getAttribute('aria-invalid') === 'true');
  }
  set('attendees', '1');
  assert('valid input restores selection', document.querySelectorAll('.room-card').length === 4 && result().startsWith('Available'));
  document.querySelector('[data-room-id=D404]').click();
  assert('blocked selection rejected', result().includes('blocked'));
  set('attendees', '31');
  assert('no match state', document.querySelectorAll('.room-card').length === 0);
  set('attendees', '1');
  return results;
})()
