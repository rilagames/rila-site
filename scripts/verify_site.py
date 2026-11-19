"""Check the published shape, internal links and language of both Jekyll sites."""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

root = Path(sys.argv[1] if len(sys.argv) > 1 else '_pages').resolve()
origin = 'https://rilagames.github.io'
base = '/rila-site/'
errors = []
class Document(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.links = []
        self.ids = set()
        self.lang = None
        self.path = path
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html': self.lang = attrs.get('lang')
        if 'id' in attrs: self.ids.add(attrs['id'])
        for name in ('href', 'src'):
            if name in attrs: self.links.append(attrs[name])

docs = {}
for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    doc = Document(path)
    doc.feed(text)
    docs[path] = doc
    if doc.lang != 'en': errors.append(f'{path}: html language is {doc.lang}')
    if re.search(r'Rila PVP|Safe Zone|Warlock|Pure Mage|/assets/imgs?/pvp/|/wiki/(classes|pvp|safe-zone|vendors|statistics)/|[çğıöşüÇĞİÖŞÜ]', text):
        errors.append(f'{path}: retired content or untranslated text')

for path, doc in docs.items():
    relative = path.relative_to(root).as_posix()
    address = origin + base + relative
    if address.endswith('index.html'): address = address[:-10]
    for link in doc.links:
        url = urlsplit(urljoin(address, link))
        if url.scheme not in ('http','https') or url.netloc != 'rilagames.github.io': continue
        if not url.path.startswith(base):
            errors.append(f'{path}: link escapes site base: {link}')
            continue
        target = root / unquote(url.path[len(base):])
        if url.path.endswith('/'): target /= 'index.html'
        if not target.is_file():
            errors.append(f'{path}: missing target: {link}')
        elif url.fragment and target in docs and unquote(url.fragment) not in docs[target].ids:
            errors.append(f'{path}: missing anchor: {link}')

index = json.loads((root / 'wiki/search-index.json').read_text(encoding='utf-8'))
assert len(index) >= 70, len(index)
assert len({p['url'] for p in index}) == len(index), 'duplicate search URLs'
for topic in ['classes','pvp','safe-zone','vendors','statistics','flame-armor','heaven-armor','holy-armor','vampiric-warrior']:
    if (root/'wiki'/topic).exists(): errors.append(f'retired route still exists: {topic}')
assert '60' in (root/'wiki/level-system/index.html').read_text(encoding='utf-8')
assert '268' in (root/'wiki/mounts/index.html').read_text(encoding='utf-8')
assert 'Unlimited' in (root/'wiki/fire-armor/index.html').read_text(encoding='utf-8')
if errors:
    raise SystemExit('\n'.join(errors))
print(json.dumps({'htmlPages':len(docs),'searchEntries':len(index),'internalLinks':'passed','language':'en','retiredRoutes':'absent'}))
