let tunes = [
    {
        abc: `
            X: 64
            T: Cold Frosty Morning
            N: irish and bluegrass
            M: 4/4
            L: 1/8
            R: reel
            K: Ador
            |:EDEGA2A2|ABcde2(3DEF|GABAG2D2|GABcd2D2|
            EDEGA2A2|ABcde2ed|cBAc BAGB|A4A4:|
            |:edega2a2|abag e2ef|gfga gfef|gagfe2e2|
            A2AAc2cc|d2dde2ee|cBAc BAGB|A4A4:|
        `,
        tags: ['irish', 'bluegrass','reel']
    },
    {
        abc: `
            X:1
            T: Cooley's
            M: 4/4
            L: 1/8
            R: reel
            K: Emin
            D2|:"Em"EB{c}BA B2 EB|~B2 AB dBAG|"D"FDAD BDAD|FDAD dAFD|
            "Em"EBBA B2 EB|B2 AB defg|"D"afe^c dBAF|1"Em"DEFD E2 D2:|2"Em"DEFD E2 gf||
            |:"Em"eB B2 efge|eB B2 gedB|"D"A2 FA DAFA|A2 FA defg|
            "Em"eB B2 eBgB|eB B2 defg|"D"afe^c dBAF|1"Em"DEFD E2 gf:|2"Em"DEFD E4|]
        `,
        tags: '',
        links: [
            {
                title: "Backing Track (strum machine)", 
                url: "https://strummachine.com/app/songs/7Gs8Kt2NxjzbnXgqP"
            }]
    },
    {
        abc: `
            X:
            T:Balfa Waltz
            L:1/8
            Q:1/4=120
            M:3/4
            K:Am
            (3:2:2a2 g | "Am"(3:2:2a2 g (3:2:2e2 ^d e2 | a2 (3:2:2e2 a (3:2:2g2 e | (3age (3:2:1!slide!e3 (3edc | 
            A2- (3:2:2A2 B (3:2:2c2 A | !slide!e2 !slide!e2 !slide!e2 | "E" e2- (3:2:2e2 a (3:2:2g2 e | (3age (3:2:1e3 (3edc | "Am" A4 ] 
        `,
        tags: ["cajun","waltz","steve's favs"],
        links: [
            {
                title: "Valse de Balfa - Cajun Roosters (Spotify)",
                url: "https://open.spotify.com/track/5m2OpNfZexMtJX3TtEW7oN?si=fwUtayH7QVSUM8PiJaoQ-w"
            }]
    }, 
    {
        abc: `
            X:45
            T:Squirrel Hunters
            O:england
            M:4/4
            L:1/8
            S:John Hartford's "Wild Hog in the Redbrush" transcribed by Larry Brandon
            K:D
            Q:1/2=110
            |:"Em"e3d .B2 Bd|efed .B2 BA|"G"GABc d2 dc|dBcA "D" BcBA|
            "Em"e3d .B2 Bd|efed .B2 BA|"G" GABc d2 B2|1"D" A8:|2"D" A6|
            |:Bd|"A"edeg a2ag|edef g2BA|"G"GABc d2dc|dBcA "D"BcBA|
            "A"edeg abag|edef g2BA|"G"GABc d2B2|1"D"A6:|2"D"A8||
        `,
        tags: ["steve's favs"],
        links: [
            {
                title: "John Hartford - Kentucky Tunes - The Squirrel Hunters (YouTube)",
                url: "https://www.youtube.com/watch?v=gV98pfwsM3k"
            },
            {
                title: "Squirrel Hunter - Adam Steffey (YouTube)",
                url: "https://open.spotify.com/track/6r4WfrTMfl1etEcxbNy3Is?si=SWHcDxNpSsSduHhbZHfRrw"
            }
        ]
    },
    {
        abc: `
            X:124
            T:Return from Fingal
            M:C
            L:1/8
            K:Edor
            Q:1/4=96
            "Em"B2 GF EFGA|B2 GF "A7"E3 B|"D"AGFA d3 A|"Bm"B2 A2 "G"Bcde|!
            "Em"B2 GF EFGA|B2 GF "A7"E3 B|"D"AGFA "Bm"d2 AB|"Em"F2 E2 E4:|!
            "Bm7"f2 e2 "A"e2 dc|"G"B2 A2 "D"d3 A|"G"B2 A2 "D"d3 A|"F#m7"B2 A2 "A7"Bcde|!
            "Bm7"f2 e2 "A"e2 dc|"G"B2 A2 "D"d3 B|AGFA "Bm7"d2 AB|"Em"F2 E2 E4:|
        `,
        tags: ["steve's favs", "irish"]
    },
    {
        abc: `
            X:1263
            T:Her Long Dark Hair Flowing Down Her Back
            M:4/4
            L:1/8
            R:hornpipe
            K:Dmaj
            |:de|fedf e2dB|AF~F2 ABde|fedf e2de|fbba b2ag|
            fedf e2dB|AF~F2 ABde|fedf edBA|B2BA B2:|
            |:de|faab afef|dBAB d3e|fbba b2ag|fedf ~e2de|
            faab afef|dBAB d3e|fedf edBA|B2BA B2:|
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:6437
            T:Amy's Waltz
            M:3/4
            L:1/8
            R:waltz
            K:Emaj
            E>G|:B3 c Bc|e4  c>B|G4 F>E|C2 B,2 B,>C|E4 (3EGB|c4 B>c|e3 E E>G|F6 |
            e4 d>c|BG3 FG|A3G F>E|CB,3  B,>C|E4 (3EFG|F2 G2 F2|E6 |1E4 E>G:|2 E4 B>c||
            |: e3c c>B|e3c c>B|c3B B>G|B4 (3Bcd|e3 c c>B|G4  FG|A3G F>E|C4 B,C|
            E3G F>G|E3D E>F|G3F F>E|ce4 c|B3 G E2|FG3 F2|E6 |1E4 B>c:|2 E6||
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:10668
            T:Flatwater Fran
            M:3/4
            L:1/8
            R:waltz
            K:Gmaj
            DE|:"G"G2G2DE|G2G2Bd|"C"e2d2G2|"G"B4DE|G2G2DE|"Am"A2A2GA|
            "Em"B2AG ED|"C"E4DE|"G"G2G2DE|G2G2Bd|"C"e2d2g2|"G"B4dB|
            "Am"A2AG AB|"Em"AGE2GE|"C"DEG2"D7"G2|1"G"G4DE:|2"G"G4Bd||
            |:"C"e2d2G2|"G"B4Bd|"C"e2d2G2|"G"B4Bd|"C"e2d2g2|"Em"B2dB AG|
            "Am"A2AG AB|"D"A4Bd|"C"e2d2g2|"G"B2dB AG|"D7"A2d3c|"Em"B3B AG|
            "Am"EA AG AB|"Em"AG E2GE|1"C"DEG2"D7"G2|"G"G4Bd:|2"C"DEG2"D7"A2|"G"G4||
        `,
        tags: ["waltz"]
    },
    {
        abc: `
            X:116
            T:Wind That Shakes The Barley, The
            M:4/4
            L:1/8
            R:reel
            K:Dmaj
            |A2AB AFED|B2BA BcdB|A2AB AFED|gfed BcdB|
            A2AB AFED|B2BA BcdB|A2AB AFED|gfed Bcde|
            |f2fd g2ge|f2fd Bcde|f2fd g2fg|afed Bcde|
            f2fd g2ge|f2fd Bcde|f2ae g2be|afed BcdB|
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:10
            T:Butterfly, The
            M:9/8
            L:1/8
            R:slip jig
            K:Emin
            |:B2E G2E F3|B2E G2E FED|B2E G2E F3|B2d d2B AFD:|
            |:B2d e2f g3|B2d g2e dBA|B2d e2f g2a|b2a g2e dBA:|
            |:B3 B2A G2A|B3 BAB dBA|B3 B2A G2A|B2d g2e dBA:|
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:14007
            T:Niel Gow's Lament for the Death of his Second Wife
            T:Neil Gow's Lament
            R:Air
            C:Niel Gow 1805
            O:Scotland
            Z:Paul Hardy's Session Tunebook 2012 (see www.paulhardy.net). Creative Commons cc by-nc-sa licenced.
            M:6/8
            L:1/8
            Q:3/8=40
            K:D
            D/B,/|"D"A,>B,D "Bm"D>ED|"Em"EFA "G"B2 d/B/|"D"A>FD "Em"E>DE|"D"FDB, "G"B,2 D/B,/|
            "D"A,>B,D "Bm"D>ED|"Em"EFA "G"d2 c/B/|"D"A>FD "G"B,2 A,|"G"B, "Em7"D D "D"D2:|
            (3A/B/c/|"D"d>fd "A"ecA|"G"B/A/B/c/d B/A/G/F/E/<D/|"Em"E2 D/E/ "D"F>ED|"Bm"FDB, "Em7"B,2 (3A/B/c/|
            "D"d>af "A"ec>A|"G"B/A/B/c/d B/A/G/F/E/<D/|"Em"E2 D/E/ "D"F>D"G"B,|"D"A,B,"Em7"D "D"D2 (3A/B/c/|
            "D"d>fd "A"ec>A|"G"B/A/B/c/d B/A/G/F/E/<D/|"D"F/D/A/F/d/A/ "G"B/A/G/F/E//D3/4|"D"F2 "Em"E "A7"E>DB,|
            "D"A,>B,D "Bm"D3/2E/D|"Em"EFA "G"d>cB|"D"A>FD "G"B,2 A,|"G"B, "Em7"D D "D"D2|]
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:037
            T:Oot Pik Waltz
            T:Ook Pick Waltz
            T:Uke Pick
            T:Eskimo Waltz
            C:Frank Rogers
            M:3/4
            L:1/4
            K:G
            (3D/E/F/|G> F G/B/|A G E/D/|E G> A| G B d|e>d e/f/|e d B/G/|B d>e| 
            d2 B/d/|e>d e/g/|e d B/A/|B d B/A/|G E D|C> B, C/E/|D F E/D/|E G> A| 
            G B d|e B> A|B2 e|d B> A|B2 B|A> G A/B/|A G E/D/|E G A|G B d|e B> A|
            B2 f/e/|d B>G|B2 B|A> G A/B/|A G E/D/|E G E|D2|]
        `,
        tags: ["waltz"]
    },
    {
        abc: `
            X:1651
            T:Sergeant Early's Dream
            M:4/4
            L:1/8
            R:reel
            K:Ddor
            |:dc|ADDE FAcA|GECD ~E3F|DA, DE FEFG|Adde fedc|
            ADDE FAcA|GECD ED^CE|DA,DE FAcA|GECE D2:|
            |:FG|Addc d2Ad|f2ed cAGF|ECEG cBcd|eced cABG|
            Addc d2Ad|f2ed cAFA|GEcE dEcE|ED^CE D2:|
        `,
        tags: ["irish","reel"]
    },
    {
        abc: `
            X:6842
            T:Contentment Is Wealth
            M:6/8
            L:1/8
            R:jig
            K:Edor
            F|GFG Eed|BAB EFG|FEF DdB|AFD Def|
            gfe edB|BAB dcd|BdB DFA|GED E2:|
            f|gbe gbe|geg bag|fdd Add|fdf afd|
            gfe edB|BAB dcd|BdB DFA|GED E2:|
        `,
        tags: ["irish","jig"]
    },
    {
        abc: `
            X:323
            T:Eddie Moloney's Favorite
            M:4/4
            L:1/8
            R:reel
            K:Edor
            B2GB EBGB|A2FA DAFA|B2GB EBGA|(3Bcd ef gfed|
            B2GB dBGB|A2FA dAFA|BAGF EFGA|(3Bcd ed Bdef||
            ~g3f gfed|~B3A (3Bcd ef|g2ef gefd|(3Bcd AF GE~E2|
            ~g3a gfed|B2AB GBFB|~E3F GFGA|(3Bcd ef gfed||
            "variations"
            B2GB EBGB|BAFA DAFA|B2GB EFGA|(3Bcd ed Bded|
            B2BG EGBd|A2FA DAFA|B2GF GFGA|Bded (3Bcd ef||
            ~g3f gfed|A~B2A Bdef|~g3f gfed|(3Bcd Ad BE~E2|
            gbef gefd|BdAB GBAG|EB,EF ~G3A|(3Bcd ed Bded||
        `,
        tags: ["irish","reel"]
    },
    {
        abc: `
            X:102
            T:Hag at the Churn, The
            R:jig
            H:Caoimhin Mac Aoidh wrote:
            H:Is also well known in its Irish title Cailleach 'sa Mhaistrim and should
            H:be interprested as the Hag IN the Churn. This refers to the folklore
            H:scenario whereby witches would inhabit churns to steal butter. Butter
            H:could never be made if a witch was in the house when churning was taking
            H:place. Witches could not tolerate this tune and it would therefore be
            H:played anytime butter was being churned to drive them away. It was a
            H:terrible mark on a woman if she left a house while this tune was being
            H:played and churning was going on. It was a big favourite of the Dohertys.
            D:Bothy Band: Out of the Wind, into the Sun
            Z:id:hn-jig-102
            M:6/8
            K:Dmix
            A2G ADD|A2G Adc|A2G ADD|EFG EFG:|
            AdB c2G|Add efg|1 AdB c2G|EDE GED:|2 fge dcA|GEF GED||
        `,
        tags: ["irish","jig"]
    },
    {
        abc: `
            X:450
            T:Gorman's Reel
            R:reel
            D:Matt Molloy & Sean Keane: Contentment Is Wealth
            D:Four Men and a Dog: Shifting Gravel
            Z:id:hn-reel-450
            M:C|
            K:D
            ~A3B defa|agfd efdB|~A3B defe|dBAF EFD2:|
            ~a3f defa|~a2fd efdf|~a3f defe|dBAF EFD2|
            ~a3f defa|~a2fd efdB|~A3B defe|dBAF EFD2||
        `,
        tags: ["irish","reel"]
    },
    {
        abc: `
            X:11638
            T:Train Journey North, The
            M:4/4
            L:1/8
            R:hornpipe
            K:Dmaj
            A/|d<df>A d>fA>d|f>Ad>f A2 d<f|g2 e>c A>ce>A|c<eA>c e>Af>e|
            d<df>A d>fA>d|f>Ad>f A2 d<f|g2 e>c A>ce>A|[1c<ce>g f>dd3/2:|[2c<ce>g f>Ad>f||
            |:a2 f>d A<Af>A|d>fa>f g>fe>f|g2 e>c A<Ae>A|c<eA>g f>Ad>f|
            a2 f>d A<Af>A|d>fa>f g>fe>f|g2 e>c A>ce>A|[1c<ce>g f>Ad>f:|[2c<ce>g f>dd>A||
            |:d<df>A d>fA>d|d<df>A d>fA>d|c<ce>A c<ce>A|d<df>A d<df>A|
            d<df>A d>fA>d|d<df>A d>fA>d|c<ce>f g2 e>A|[1c<ce>g f>dd>A:|[2c<ce>g f>Ad>f||
            |:a2 f>d d<da>f|g>fe>d c>de>f|g2 e>c c<ce>A|d<df>g a2 f>g|
            a2 f>d d<da>f|g>fe>d c>de>f|g2 e>c A>ce>A|[1c<ce>g f>Ad>f:|[2c<ce>g f>dd3/2|]
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:5476
            T:Sonny's Mazurka
            M:3/4
            L:1/8
            R:mazurka
            K:Dmaj
            |:DF|A2 AG FA|d2 dA BA|G3 B AG|FA EA DF|
            A2 AG FA|de dA BA|G3 g fe|d4:|
            |:Ad|f2 fa gf|e2 eg fe|d2 df ed|cd Bd Ad|
            f2 fa gf|e2 eg fe|d2 df ec|d4 :|
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:89
            T:Rambling Pitchfork, The
            M:6/8
            L:1/8
            R:jig
            K:Dmaj
            F2F AFF|dFF AFF|G2G ABc|ded cAG|
            FEF AFF|dFF AFF|GFG BAG|FDD D3:|
            d2e fed|ecA ABc|dcd fed|faf gfe|
            d2e fed|ecA BAF|GFG BAG|FDD D3:|
        `,
        tags: ["irish","jig"]
    },
    {
        abc: `
            X:9969
            T:Scattery Island
            M:6/8
            L:1/8
            R:jig
            K:Gmaj
            g/g/e|:  d2 B BAB | dBB Bge | d2B BAB | GEE Ege |
            d2 B BAB | dBB BAB  | efg fed |1 e3 ege :|2 e3 e2f||
            |:ggd gab |aag f2d | deg fed| eed  ABd |
            ggd gab |aag f2d | efg fed|1 e3 e2f :|2e3 Bge||
        `,
        tags: ["irish","jig"]
    },
    {
        abc: `
            X:88
            T:Rolling Waves, The
            M:6/8
            L:1/8
            R:jig
            K:Dmaj
            |:FEF DED| D2d cAG|FEF FED|A2F GFE|
            FEF DED|D2d cAG|FAF GBG|A2F GFE:|
            D2d cAd| cAd cAG|FEF cAd|A2F GFE|
            D2d cAd|fed cAG|FAF GBG|A2F GFE:|
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:22
            T:Banshee, The
            T:McMahon's
            R:reel
            C:James McMahon (Co. Fermanagh fiddle/flute player, b. ~1900)
            Z:id:hn-reel-22
            M:C|
            K:G
            ~G3D EDB,D|GFGB d2Bd|eged BAGA|BAGE EDDE|
            ~G3D EDB,D|GFGB d2Bd|eged BAGA|BAGE EDD2:|
            |:eaag efge|dBBA B3z|eB~B2 gBfB|eBBA B3z|
            eaag efge|dBBA B3z|eged BAGA|BAGE EDD2:|
        `,
        tags: ["irish","reel"]
    },
    {
        abc: `
            X:832
            T:MacLeod's Farewell
            T:Wedding Reel, The
            R:reel
            C:Donald Shaw
            S:Ulf Duus
            D:L\'unasa: The Merry Sisters of Fate
            M:C|
            L:1/8
            Z:id:hn-reel-831
            K:D
            DE | EFBF AFEF | D2DE FABd | e2fd efdB | ABde dBAG |
            ~F2BF AFEF | D2DE FABd | e2fd efdB |1 ABde d2 :|2 ABde d3B ||
            |: ~A3f edfd | ~A3f edfd | ABdA BdAB | dBAF E2DE |
            ~F2BF AFEF | D2DE FABd | e2fd efdB |1 ABde d3B :|2 ABde d2 ||
            "variations"
            |: DE | ~F2BF AFEF | D2DE FABd | e2fd efed | ABeB dBAG |
            E~F2B AFEF | D2DE FABd | e2fd efdB |1 ABde d2 :|2 ABde d3B ||
            |: ~A3f edfd | ~A3f edfd | ABdA BdAB | dBAF EDB,D |
            E~F2B AFEF | D2DE FABd | e2fd efdB |1 ABde d3B :|2 ABde d2 ||
        `,
        tags: ["irish","reel"]
    },
    {
        abc: `
            X:83
            T:Rights Of Man, The
            M:4/4
            L:1/8
            R:hornpipe
            K:Emin
            |:GA|B2A2 G2F2|EFGA B2ef|gfed edBd|cBAG A2GA|
            BcAB GAFG|EFGA B2ef|gfed Bgfg|e2 E2 E2:|
            |:ga|babg efga|babg egfe|d^cde fefg|afdf a2gf|
            edef gfga|bgaf gfef|gfed Bgfg|e2 E2 E2:|
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:307
            T:Saddle The Pony
            M:6/8
            L:1/8
            R:jig
            K:Gmaj
            D|GBA G2B|def  gdB|GBA  G2B|AFD  AFD|
            GBA  G2B|def  gfg|efe  dBA|BGG  G2:||
            d|efe  edB|def  gfg|efe  edB|dBA  ABd|
            efe  edB|def  gfg|efe  dBA|BGG  G2:||
        `,
        tags: ["irish"]
    },
    {
        abc: `
            X:9747
            T:Star Of The County Down, The
            M:3/4
            L:1/8
            R:waltz
            K:Amin
            |: E2 G2 | A4 A2 | A3 G A2 | c4 c2 | d3 c d2 | e3 d c2 | AG- G2 E2 | G6- | G2 c2 B2 |
            A4 A2 | A3 G A2 | c4 c2 | d3 c d2 | e3 d c2 | A4 A2 | A6- | A2 c2 e2 |
            g4 e2 | ed- d2 c2 | d3 e d2 | d3 c d2 | e3 d c2 | AG- G2 E2 | G6- | G2 c2 B2 |
            A4 A2 | A3 G A2 | c4 c2 | d3 c d2 | e3 d c2 | A4 A2 | A6- | A2 :|
        `,
        tags: ["irish", "waltz"]
    },
    {
        abc: `
            X:53
            T:St Anne's Reel (V)
            S:Vancouver, via EF
            M:4/4
            L:1/4
            K:D
            P:A
            d/2e/2|"D"f3/2g/2 "G"f/2e/2d/2B/2|"D"A/2A/2A/2F/2 AA/2d/2|\
            "G"B/2G/2G/2G/2 GG/2B/2|"D"A/2F/2F/2F/2 Fd/2e/2|
            "D"f3/2g/2 "G"f/2e/2d/2B/2|"D"A/2A/2A/2F/2 AA/2d/2|\
            "G"B/2G/2B/2d/2 "A7"c/2A/2B/2c/2|"D"dd d::
            P:B
            a/2g/2|"D"f/2d/2f/2a/2 f/2d/2f/2a/2|"Em"a/2gf/2 g3/2f/2|\
            "A7"e/2c/2e/2g/2 e/2c/2e/2g/2|"D"b/2a^g/2 "A"a3/2g/2|
            "D""Bm"f/2d/2f/2a/2 f/2d/2f/2a/2|"Em"a/2gf/2 g3/2f/2|\
            "A7"e/2c/2e/2g/2 e/2c/2e/2g/2|"A7"f/2d/2e/2c/2 "D"d:|
        `,
        tags: ["irish","reel"]
    },
    {
        abc: `
            X:29
            T:Teatotaller, The
            T:Temperance reel, The
            R:reel
            Z:id:hn-reel-29
            M:C|
            K:G
            G2GF GABc|dBge dBAc|BEED EFGA|BGEF GFED|
            G2GF GABc|dBge dBAc|BEED EFGA|BGEF G4:|
            |:Beed e2ef|geaf gfed|Bdd^c d2de|fdfa gfed|
            Beed e2ef|geaf gfed|BEED EFGA|BGEF G4:|
            "Variations:"
            DGGF GABc|dgeB dBAc|BEED EFGA|BGAF GFEF|
            DGGF GABc|dgge dBAc|BEED EFGA|BGAF G4:|
            |:Beed e2ef|gaaf gfed|Bdd^c d2de|fdfa gfed|
            Beed e2ef|gaaf gfed|BEED EFGA|BGAF G4:|
        `,
        tags: ["irish","waltz"]
    },
    //,
    // {
    //     abc: `
    //         X: 1
    //         T: Jingle Bells [G]
    //         Z: John Chambers <jc:trillian.mit.edu>
    //         M: 6/8
    //         L: 1/8
    //         R: jig
    //         K: G
    //         [| "G"D2B A2G \
    //         | D3- DB,C \
    //         | D2B A2G \
    //         | "C"E6 \
    //         | "Am"E2c B2A \
    //         | "D7"F6 \
    //         | d2d c2A \
    //         | "G"B6 ||
    //         || "G"D2B A2G \
    //         | D3- DB,C \
    //         | D2B A2G \
    //         | "C"E6 \
    //         | "Am"E2c B2A \
    //         | "G"d2d d2d \
    //         | "D7"e2d c2A \
    //         | "G"G3 d3 |]
    //         |: "G"B2B B3 \
    //         | B2B B3 \
    //         | B2d G2A \
    //         | "G7"B6 \
    //         | "C"c2c c2c \
    //         | "G"c2B B2B \
    //         |1 "A7"B2A A2B \
    //         | "D7"A3 d3 \
    //         :|2 "D7"d2d c2A \
    //         | "G"G6 |]

    //     `,
    //     tags: ["christmas"]
    // },
    {
        abc: `
            X:3
            T:Reel de Joie
            R:reel
            L:1/8
            Q:1/4=160
            M:4/4
            K:D
            ABde | "D" f3 g fedc | "Bm" B3 A Bcde | "D" f3 g fedc | "Bm" B3 B2 ABA | 
            "D" f3 g fedc | "Bm" B2 Bc BAFG | "G"ABAG "A"FDED | "D"!slide!D4 :|
            |: z2 dc | "Bm"B3 c BAFA | B3 c BAFA | B3 c BAFA | B3 B2 AFA | 
            "G"B3 c BAFA | B2 Bc BAFG | ABAG "A"FDED | "D"!slide!D4 :| 
        `,
        tags: ['cajun',"steve's favs"]
    },
    {
        abc: `
            X:4
            T:Grandpa's Waltz
            R:waltz
            L:1/8
            Q:1/4=90
            M:3/4
            K:G
            (3::2 g2a (3gag || "C" e>d c2 c>d  | e4 (3ed!slide!^c | "A" !slide!A2- (3::2 A2B (3::2 A2G | (3::2 !slide!F2D !slide!f2 (3fed  | "D"!slide!f2- (3::2 f2g | 
            [1 (3 f2g/f/ | (3::2 e2d !slide!f2 (3::2 e2d | "G" {Bc}d4 (3dBA | G2 :| [2 (3::2 f2g | (3::4 f/g/fe (3::2 d2B (3::2 A2F | "G" G2 |:
            (3::2 B2d (3::2 e2f | g2 (3::2 d2g (3::2 b2a | (3g/a/g2 (3::2 d2g (3::2 b2a | (3::2 g2f (3::2 e2d (3::4 B/c/BA | 
            "A" !slide!A2 (3::2 A2B (3::2 d2e | "D" (3 f/g/f2 (3::2 d2f (3::2 a2g | (3::4 f/g/fe (3::2 d2f (3::2 a2g |
            [1 (3::2 f2e (3::2 d2B (3::2 A2G | "G" B4 (3::4 B/c/BA | (3::2 G2A  :| [2 (3::2 f2e (3::2 d2B (3::2 A2F | "G" G4 (3::2 G2F | G2 || 
        `,
        tags: ['cajun',"steve's favs"]
    },
    {
        abc: `
            X:2
            T:Kitchen Girl
            C:Trad.
            K:D
            [c4a4] [B4g4]|efed c2cd|e2f2 gaba|g2e2 e2fg|
            a4 g4|efed cdef|g2d2 efed|c2A2 A4:|
            K:G
            ABcA BAGB|ABAG EDEG|A2AB c2d2|e3f edcB|ABcA BAGB|
            ABAG EGAB|cBAc BAG2|A4 A4:|
        `,
        tags: ['contra']


    }
];
