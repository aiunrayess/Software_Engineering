from pathlib import Path
from urllib.request import urlopen
import json
for path in ['index.html', 'styles.css', *[str(p) for p in Path('src').glob('*.js')]]:
    built = Path('dist') / path
    assert built.read_bytes() == Path(path).read_bytes(), path
    response = urlopen('http://localhost:8000/dist/' + path)
    assert response.status == 200 and response.read() == built.read_bytes(), path
    print('PASS exported asset and HTTP content:', path)
results = json.loads(Path('docs/assignment-05/evidence/browser-checks.json').read_text())
assert len(results) == 10 and all(item['passed'] for item in results)
print('PASS 10 browser assertions recorded; all static export assets match source.')
