#!/usr/bin/env python3
"""Replace <div class=...><img src={brokenEmptySvg}/></div> wrappers with <Icon name=.../>."""
import re, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EMPTY = set('''001d2 08ba3 09fb5 0d423 10ad7 128da 156c0 16689 17688 235d5 23b92 2499a 258ec 26a63 2b843 2f50c
2f58d 3186c 3b2a7 44030 4aadb 4cd57 51177 531f8 562ba 56586 5abb2 5f858 64df0 6a818 6d901 72309 726e1
734ad 74383 7647b 7ba43 7e754 7ec7a 80a04 81c83 82bef 85f58 8875f 89638 8ebe1 9677a 97ec3 980d9 9c631
af606 af7b9 bcc79 bdcde da866 db245 dc706 e37a2 e8b1a e9e26 ebbdc efd42 f0d90 f51ce f666b f67bc f8422 f9602
fccc4'''.split())

# (file, const-name) -> icon name.  Fallback keyed by asset hash.
BY_CONST = {
    # ---- Header ----
    ('src/components/Header.tsx', 'imgShield'): 'shieldCheck',
    ('src/components/Header.tsx', 'imgPhone'): 'phone',
    ('src/components/Header.tsx', 'imgMapPin'): 'mapPin',
    # ---- Footer ----
    ('src/components/Footer.tsx', 'imgPiliersIcon'): 'pillars',
    ('src/components/Footer.tsx', 'imgTransparenceIcon'): 'shieldCheck',
    ('src/components/Footer.tsx', 'imgPhoneIcon'): 'phone',
    ('src/components/Footer.tsx', 'imgPhoneContactIcon'): 'phone',
    ('src/components/Footer.tsx', 'imgWhatsappIcon'): 'whatsapp',
    ('src/components/Footer.tsx', 'imgMoneyIcon'): 'wallet',
    # ---- Accueil ----
    ('src/pages/Accueil.tsx', 'imgEducation'): 'graduationCap',
    ('src/pages/Accueil.tsx', 'imgNutrition'): 'utensils',
    ('src/pages/Accueil.tsx', 'imgProtection'): 'shieldCheck',
    ('src/pages/Accueil.tsx', 'imgHealth'): 'heartPulse',
    # ---- NousSoutenir ----
    ('src/pages/NousSoutenir.tsx', 'imgVector3'): 'heartPulse',
    ('src/pages/NousSoutenir.tsx', 'imgVector4'): 'camera',
    ('src/pages/NousSoutenir.tsx', 'imgVector5'): 'receipt',
    ('src/pages/NousSoutenir.tsx', 'imgVector6'): 'percent',
    ('src/pages/NousSoutenir.tsx', 'imgVector7'): 'clipboardCheck',
    ('src/pages/NousSoutenir.tsx', 'imgVector8'): 'check',
    ('src/pages/NousSoutenir.tsx', 'imgVector9'): 'lock',
    ('src/pages/NousSoutenir.tsx', 'imgVector10'): 'smartphone',
    ('src/pages/NousSoutenir.tsx', 'imgVector11'): 'whatsapp',
    ('src/pages/NousSoutenir.tsx', 'imgVector12'): 'wallet',
    ('src/pages/NousSoutenir.tsx', 'imgVector13'): 'smartphone',
    ('src/pages/NousSoutenir.tsx', 'imgVector14'): 'copy',
    ('src/pages/NousSoutenir.tsx', 'imgVector15'): 'landmark',
    ('src/pages/NousSoutenir.tsx', 'imgVector16'): 'creditCard',
    ('src/pages/NousSoutenir.tsx', 'imgVector17'): 'arrowLeftRight',
    ('src/pages/NousSoutenir.tsx', 'imgVector18'): 'globe',
    ('src/pages/NousSoutenir.tsx', 'imgVector19'): 'arrowRight',
    ('src/pages/NousSoutenir.tsx', 'imgVector20'): 'arrowRight',
    ('src/pages/NousSoutenir.tsx', 'imgVector21'): 'arrowRight',
    ('src/pages/NousSoutenir.tsx', 'imgVector22'): 'award',
    ('src/pages/NousSoutenir.tsx', 'imgVector23'): 'scrollText',
    ('src/pages/NousSoutenir.tsx', 'imgVector26'): 'handHeart',
    ('src/pages/NousSoutenir.tsx', 'imgVector27'): 'handHeart',
    ('src/pages/NousSoutenir.tsx', 'imgVector28'): 'phone',
    # ---- NosProjets ----
    ('src/pages/NosProjets.tsx', 'imgContainer21'): 'phone',
    # ---- NotreImpact (line-accurate) ----
    ('src/pages/NotreImpact.tsx', 'imgVector'): 'shieldCheck',
    ('src/pages/NotreImpact.tsx', 'imgVector1'): 'phone',
    ('src/pages/NotreImpact.tsx', 'imgVector2'): 'mapPin',
    ('src/pages/NotreImpact.tsx', 'imgVector3'): 'award',
    ('src/pages/NotreImpact.tsx', 'imgVector4'): 'map',
    ('src/pages/NotreImpact.tsx', 'imgVector5'): 'arrowRight',
    ('src/pages/NotreImpact.tsx', 'imgVector6'): 'clipboardCheck',
    ('src/pages/NotreImpact.tsx', 'imgVector7'): 'mapPin',
    ('src/pages/NotreImpact.tsx', 'imgVector8'): 'target',
    ('src/pages/NotreImpact.tsx', 'imgVector9'): 'recycle',
    ('src/pages/NotreImpact.tsx', 'imgVector10'): 'scale',
    ('src/pages/NotreImpact.tsx', 'imgVector11'): 'droplet',
    ('src/pages/NotreImpact.tsx', 'imgVector12'): 'bookOpen',
    ('src/pages/NotreImpact.tsx', 'imgVector13'): 'utensils',
    ('src/pages/NotreImpact.tsx', 'imgVector14'): 'home',
    ('src/pages/NotreImpact.tsx', 'imgVector15'): 'alertTriangle',
    ('src/pages/NotreImpact.tsx', 'imgVector16'): 'heartPulse',
    ('src/pages/NotreImpact.tsx', 'imgVector17'): 'palette',
    ('src/pages/NotreImpact.tsx', 'imgVector18'): 'sparkles',
    ('src/pages/NotreImpact.tsx', 'imgVector19'): 'shield',
    ('src/pages/NotreImpact.tsx', 'imgVector20'): 'brain',
    ('src/pages/NotreImpact.tsx', 'imgVector21'): 'trendingUp',
    ('src/pages/NotreImpact.tsx', 'imgVector22'): 'school',
    ('src/pages/NotreImpact.tsx', 'imgVector23'): 'eyeOff',
    ('src/pages/NotreImpact.tsx', 'imgVector24'): 'trendingUp',
    ('src/pages/NotreImpact.tsx', 'imgVector25'): 'clock',
    ('src/pages/NotreImpact.tsx', 'imgVector26'): 'xCircle',
    ('src/pages/NotreImpact.tsx', 'imgVector27'): 'checkCircle',
    ('src/pages/NotreImpact.tsx', 'imgVector28'): 'trendingUp',
    ('src/pages/NotreImpact.tsx', 'imgVector29'): 'trendingUp',
    ('src/pages/NotreImpact.tsx', 'imgVector30'): 'badgeCheck',
    ('src/pages/NotreImpact.tsx', 'imgVector31'): 'download',
    ('src/pages/NotreImpact.tsx', 'imgVector32'): 'handHeart',
    ('src/pages/NotreImpact.tsx', 'imgVector33'): 'arrowRight',
    ('src/pages/NotreImpact.tsx', 'imgVector34'): 'arrowRight',
    ('src/pages/NotreImpact.tsx', 'imgVector35'): 'phone',
    ('src/pages/NotreImpact.tsx', 'imgVector36'): 'scrollText',
    ('src/pages/NotreImpact.tsx', 'imgVector37'): 'mapPin',
    ('src/pages/NotreImpact.tsx', 'imgVector38'): 'pillars',
    ('src/pages/NotreImpact.tsx', 'imgVector39'): 'fileText',
    ('src/pages/NotreImpact.tsx', 'imgVector40'): 'badgeCheck',
    ('src/pages/NotreImpact.tsx', 'imgVector41'): 'scale',
    ('src/pages/NotreImpact.tsx', 'imgVector42'): 'handshake',
    ('src/pages/NotreImpact.tsx', 'imgVector43'): 'trendingUp',
    ('src/pages/NotreImpact.tsx', 'imgVector44'): 'phone',
    ('src/pages/NotreImpact.tsx', 'imgVector45'): 'whatsapp',
    ('src/pages/NotreImpact.tsx', 'imgVector46'): 'wallet',
}

# Fallback for any const not listed above.
BY_HASH = {
    '3186c': 'heartPulse', '81c83': 'check', 'dc706': 'lock', '2f50c': 'smartphone',
    '17688': 'whatsapp', '80a04': 'wallet', '7ec7a': 'smartphone', '44030': 'copy',
    '6d901': 'award', '23b92': 'scrollText', 'e37a2': 'handHeart', '001d2': 'handHeart',
    '6a818': 'phone', 'e9e26': 'phone',
}

# Matches:  <div ...>  ...  <img ... src={CONST} ... />  ...  </div>   (single- or multi-line JSX)
PAT = re.compile(
    r'<div\s+className="(?P<wrap>[^"]*)"[^>]*>\s*'
    r'<img\s+alt=""\s+className="(?P<inner>[^"]*)"\s+src=\{(?P<src>[A-Za-z0-9_]+)\}\s*/>\s*'
    r'</div>',
    re.S,
)


def resolve_size(wrap: str, inner: str):
    """Return (size_px, extra_classes) from the wrapper box."""
    def num(pat, s):
        m = re.search(pat, s)
        return float(m.group(1)) if m else None

    w = num(r'\bw-\[([\d.]+)px\]', wrap)
    h = num(r'\bh-\[([\d.]+)px\]', wrap)
    s = num(r'\bsize-\[([\d.]+)px\]', wrap)
    if s is None:
        s = num(r'\bsize-(\d+(?:\.\d+)?)\b', wrap)
    if s is not None:
        return s
    if w is not None and h is not None:
        return max(w, h)
    if h is not None:
        return h
    if w is not None:
        return w
    return 16.0


def main():
    targets = sorted({f for f, _ in BY_CONST})
    total = 0
    for rel in targets:
        path = os.path.join(ROOT, rel)
        src = open(path, encoding='utf-8').read()

        # map const -> asset hash
        consts = {}
        for m in re.finditer(r'const\s+([A-Za-z0-9_]+)\s*=\s*`\$\{assetPathPrefix\}/([0-9a-f]+)\.svg`', src):
            if m.group(2) in EMPTY:
                consts[m.group(1)] = m.group(2)

        if not consts:
            continue

        count = 0

        def repl(m):
            nonlocal count
            name = m.group('src')
            h = consts.get(name)
            if not h:
                return m.group(0)
            icon = BY_CONST.get((rel, name)) or BY_HASH.get(h)
            if not icon:
                return m.group(0)
            wrap, inner = m.group('wrap'), m.group('inner')
            size = resolve_size(wrap, inner)
            size = round(size, 2)
            # keep layout classes that matter, drop the absolute positioning of the img
            keep = [c for c in wrap.split()
                    if c.startswith(('mt-', 'mb-', 'mr-', 'ml-', 'self-', 'shrink-0', 'relative', 'flex-shrink'))
                    and c not in ('relative',)]
            if 'shrink-0' in wrap.split() and 'shrink-0' not in keep:
                keep.append('shrink-0')
            cls = (' className="%s"' % ' '.join(keep)) if keep else ''
            count += 1
            return '<Icon name="%s" size={%s}%s />' % (icon, size, cls)

        out = PAT.sub(repl, src)
        if count:
            open(path, 'w', encoding='utf-8').write(out)
            total += count
            print(f"{rel}: replaced {count}")
    print("TOTAL", total)


if __name__ == '__main__':
    main()
