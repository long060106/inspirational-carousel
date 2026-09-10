/* line-engine.js — statement generation for the inspirational carousel.
   Classic script (no modules) so it loads over file:// . Exposes window.LineEngine.

   The mechanic every pattern is built on: a single sentence is broken at its
   weakest grammatical joint. The kicker holds the setup and dangles on a
   function word; the header lands the payoff. The reader has to complete the
   sentence, and that half-second of completion is the engagement.

   Slots are pattern-local (`bank`) wherever a shared bank could produce a
   grammatically valid but nonsensical pairing. */
(function (root) {
'use strict';

const THEMES = ['discipline','mortality','ego','solitude','money','comfort',
                'fear','time','work','healing','attention','identity',
                'failure','family','joy','love','gratitude','envy',
                'regret','rest','worth','health','change','purpose','authentic',
                'friendship','kindness'];

const PATTERNS = [

/* ---- definition & reframe ---- */
{id:'reframe', fam:'reframe', name:'the real X is', themes:['money','ego'],
 k:'the real {a} is', h:'{b}', pairs:'someone alone and unbothered in an expensive room',
 bank:{a:['flex','luxury','power','wealth','status symbol','win','currency','trophy'],
       b:['inner peace','self control','a quiet mind','owing no one','sleeping well',
          'walking away','not needing it','being unbothered','privacy','an empty calendar',
          'saying no','being hard to reach']}},

{id:'disc', fam:'reframe', name:'discipline is', themes:['discipline','work'],
 k:'discipline is', h:'{a}', pairs:'cold light, early morning, repetition',
 bank:{a:['self respect','love in action','freedom','a quiet loyalty','the price of freedom',
          'choosing later over now','doing it unwatched','keeping your own promises']}},

{id:'comfort', fam:'reframe', name:'comfort is', themes:['comfort','fear'],
 k:'comfort is', h:'{a}', pairs:'a sofa in blue TV light, a soft warm interior',
 bank:{a:['expensive','the slow death','a good liar','where potential rests','the real risk']}},

{id:'peace', fam:'reframe', name:'peace is', themes:['solitude','healing'],
 k:'peace is', h:'{a}', pairs:'still water, an empty room, a long horizon',
 bank:{a:['expensive','a boundary','the whole point','worth the distance']}},

{id:'redefine', fam:'reframe', name:'X is not a feeling', themes:['discipline','healing'],
 k:"{a} isn't a feeling", h:'it’s a decision', pairs:'hands, work, an unglamorous moment',
 bank:{a:['discipline','love','healing','confidence','loyalty']}},

{id:'rich', fam:'reframe', name:'rich is', themes:['money','ego'],
 k:'rich is', h:'not needing to prove it', pairs:'understated luxury shot coldly'},

{id:'solitudeSkill', fam:'reframe', name:'solitude is a skill', themes:['solitude'],
 k:'solitude is', h:'a skill', pairs:'one figure, wide negative space'},

{id:'fearIs', fam:'reframe', name:'fear is', themes:['fear'],
 k:'fear is', h:'{a}', pairs:'a doorway, a threshold, someone about to move',
 bank:{a:['a compass','information','not a stop sign','the toll']}},

/* ---- questions ---- */
{id:'confront', fam:'question', name:'is this the X you really want', themes:['time','fear','mortality'],
 k:'is this the {a} you', h:'really want?', pairs:'a character mid-thought, straight down the lens',
 bank:{a:['life','story','future','ending','version of you']}},

{id:'whoWould', fam:'question', name:'who would you be without', themes:['ego','fear'],
 k:'who would you be', h:'without the {a}', pairs:'a mirror, a reflection, a face half-lit',
 bank:{a:['excuse','story','fear','audience','armour']}},

{id:'howLong', fam:'question', name:'how long will you', themes:['time','comfort'],
 k:'how long will you', h:'{a}', pairs:'a waiting room, a platform, a clock',
 bank:{a:['wait','rehearse this','call it timing','call it later']}},

{id:'whenDid', fam:'question', name:'when did you stop', themes:['healing','time'],
 k:'when did you stop', h:'{a}', pairs:'an old photograph, a childhood object',
 bank:{a:['trying','wanting it','being honest','showing up','being curious']}},

{id:'whatIf', fam:'question', name:'what if you already know', themes:['fear'],
 k:'what if you', h:'already know', pairs:'someone staring at nothing'},

{id:'whoTold', fam:'question', name:'who told you that', themes:['ego','healing'],
 k:'who told you', h:'that was true?', pairs:'a crowd, a screen, an audience'},

/* ---- negation ---- */
{id:'rescue', fam:'negation', name:'nobody is coming', themes:['discipline','solitude'],
 k:'nobody is coming', h:'{a}', pairs:'a lone figure in a wide empty frame',
 bank:{a:['to save you','to fix it','to choose you','to give you permission']}},

{id:'notlazy', fam:'negation', name:"you're not X, you're Y", themes:['fear','discipline'],
 k:"you're not {a}", h:"you’re {b}", pairs:'a face half in shadow',
 bank:{a:['lazy','tired','stuck','unlucky','lost'],
       b:['afraid','comfortable','avoiding it','inconsistent','out of alignment']}},

{id:'itsnot', fam:'negation', name:"it's not too late", themes:['time','comfort'],
 k:"it’s not too late", h:'it’s too {a}', pairs:'dusk, a lit window, a late train',
 bank:{a:['comfortable','familiar','easy']}},

{id:'noOneOwes', fam:'negation', name:'no one owes you', themes:['ego'],
 k:'no one owes you', h:'{a}', pairs:'a closed door, a turned back',
 bank:{a:['a second look','belief','an explanation','patience','the benefit of the doubt']}},

{id:'nothingChanges', fam:'negation', name:'nothing changes', themes:['discipline','time'],
 k:'nothing changes', h:'if nothing changes', pairs:'a loop — same street, same room'},

{id:'notTired', fam:'negation', name:"you're not tired", themes:['attention','comfort'],
 k:"you’re not tired", h:'you’re distracted', pairs:'a phone glow on a face at night'},

{id:'noSuchThing', fam:'negation', name:'there is no later', themes:['time'],
 k:'there is no later', h:'there is only now', pairs:'a clock, a receding road'},

/* ---- inversion & paradox ---- */
{id:'invert', fam:'inversion', name:'you need less, not more', themes:['discipline','time'],
 k:"you don’t need more {a}", h:'you need {b}', pairs:'clutter, neon chaos, a desk at 3am',
 bank:{a:['time','motivation','advice','plans','friends','information'],
       b:['fewer excuses','less noise','fewer distractions','less doubt','fewer opinions']}},

{id:'wayOut', fam:'inversion', name:'the only way out', themes:['fear','healing'],
 k:'the only way out', h:'is through', pairs:'a tunnel, a corridor, rain'},

{id:'lessMore', fam:'inversion', name:'less X, more Y', themes:['work','ego'],
 k:'less {a}', h:'more {b}', pairs:'hands working, unglamorous, unwatched',
 bank:{a:['talking','planning','proving','posting'],
       b:['building','doing','becoming','finishing']}},

{id:'slow', fam:'inversion', name:'slow is still forward', themes:['healing','discipline'],
 k:'slow is', h:'still forward', pairs:'a long road, a single walker'},

{id:'lightDark', fam:'inversion', name:'you had to lose it', themes:['healing','mortality'],
 k:'you had to lose it', h:'to want it', pairs:'an empty chair, a closed door'},

{id:'easyHard', fam:'inversion', name:'easy now, hard later', themes:['comfort','discipline'],
 k:'easy now', h:'hard later', pairs:'a warm bed against a cold window'},

/* ---- imperative ---- */
{id:'swap', fam:'imperative', name:'stop / start', themes:['discipline','fear'],
 k:'stop {a}', h:'start {b}', pairs:'motion — walking away, a door, a train',
 bank:{a:['waiting','explaining yourself','performing','scrolling','shrinking',
          'negotiating with yourself','asking permission','rehearsing','keeping score'],
       b:['building','deciding','living','moving','choosing','finishing things',
          'being honest','keeping promises']}},

{id:'doScared', fam:'imperative', name:'do it while afraid', themes:['fear'],
 k:'do it', h:'while afraid', pairs:'someone at the edge of movement'},

{id:'letHard', fam:'imperative', name:'let it be hard', themes:['discipline','work'],
 k:'let it', h:'be hard', pairs:'sweat, weight, effort'},

{id:'goWhere', fam:'imperative', name:'go where', themes:['solitude'],
 k:'go where', h:'{a}', pairs:'an unfamiliar city, a road out',
 bank:{a:['you’re not known','it’s quiet','no one is watching']}},

{id:'protect', fam:'imperative', name:'protect your', themes:['attention','solitude'],
 k:'protect your', h:'{a}', pairs:'a shut door, a dark room, a lit desk',
 bank:{a:['mornings','peace','focus','energy','quiet']}},

{id:'deleteKeep', fam:'imperative', name:'delete X, keep Y', themes:['attention','discipline'],
 k:'delete the {a}', h:'keep the {b}', pairs:'a phone face-down, an empty desk',
 bank:{a:['apps','noise','audience','group chat'],
       b:['habit','work','promise','morning']}},

{id:'showUp', fam:'imperative', name:'show up anyway', themes:['discipline','work'],
 k:'show up', h:'anyway', pairs:'rain, cold, an empty gym'},

{id:'beHard', fam:'imperative', name:'be hard to reach', themes:['attention','solitude'],
 k:'be hard', h:'to reach', pairs:'a silhouette leaving, a phone unanswered'},

{id:'explainLess', fam:'imperative', name:'explain less, build more', themes:['ego','work'],
 k:'explain less', h:'build more', pairs:'someone working, unwatched'},

{id:'beginAgain', fam:'imperative', name:'you can begin again', themes:['healing','time'],
 k:'you can begin again', h:'today counts', pairs:'sunrise, an open road'},

/* ---- cost & consequence ---- */
{id:'cost', fam:'cost', name:'everything you want costs', themes:['money','discipline'],
 k:'everything you want', h:'{a}', pairs:'something luxurious shot coldly',
 bank:{a:['costs something','is past the fear','will cost you comfort']}},

{id:'everyYes', fam:'cost', name:'every yes is a no', themes:['time','attention'],
 k:'every yes', h:'is a no somewhere', pairs:'a crowded room, two doors'},

{id:'payEither', fam:'cost', name:'you pay either way', themes:['discipline','comfort'],
 k:'you pay for it', h:'either way', pairs:'a receipt, a scale, a ledger'},

{id:'cheapNow', fam:'cost', name:'cheap now, expensive later', themes:['comfort','money'],
 k:'cheap now', h:'expensive later', pairs:'fast food neon, a bright convenience store'},

{id:'tuition', fam:'cost', name:'it was tuition', themes:['healing','money'],
 k:'it wasn’t wasted', h:'it was tuition', pairs:'an old room, a packed bag'},

{id:'moneyReveals', fam:'cost', name:'money reveals', themes:['money','ego'],
 k:'money reveals', h:'who you were', pairs:'a cold expensive interior'},

/* ---- time & mortality ---- */
{id:'someday', fam:'time', name:'someday is not a day', themes:['time','comfort'],
 k:'someday is', h:'not a day', pairs:'a calendar, a sunset, a receding road'},

{id:'mori', fam:'time', name:'you get one life', themes:['mortality','time'],
 k:'you get one life', h:'{a}', pairs:'dusk, an empty road, a window',
 bank:{a:['act like it','spend it awake','stop rehearsing','use it']}},

{id:'dayOne', fam:'time', name:'one day or day one', themes:['time','discipline'],
 k:'one day', h:'or day one', pairs:'a starting line, a doorway'},

{id:'later', fam:'time', name:'later is a lie', themes:['time','comfort'],
 k:'{a} is', h:'{b}', pairs:'a clock, an unopened door',
 bank:{a:['later','tomorrow','one more day'],
       b:['a decision','how it stays undone','the costliest word']}},

{id:'timePasses', fam:'time', name:'time passes either way', themes:['time','mortality'],
 k:'time passes', h:'either way', pairs:'a long exposure, moving light'},

{id:'runningOut', fam:'time', name:'running out of someday', themes:['mortality','time'],
 k:'you’re running out', h:'of someday', pairs:'dusk, a last train'},

/* ---- identity ---- */
{id:'identity', fam:'identity', name:'become the person', themes:['solitude','fear'],
 k:'become the person', h:'{a}', pairs:'a mirror, a reflection, a young face',
 bank:{a:['you needed','you keep looking for','you would follow','you’d be proud to be']}},

{id:'loyal', fam:'identity', name:'you are loyal to it', themes:['comfort','discipline'],
 k:'you’re not stuck', h:'you’re loyal to it', pairs:'the same street, the same room'},

{id:'oldYou', fam:'identity', name:'the old you', themes:['healing','identity'],
 k:'the old you', h:'{a}', pairs:'an old photograph, a childhood street',
 bank:{a:['wanted this','is watching','would not know you']}},

{id:'worthBecoming', fam:'identity', name:'be someone worth becoming', themes:['discipline','ego'],
 k:'be someone', h:'worth becoming', pairs:'a figure walking into light'},

/* ---- ego, silence, other people ---- */
{id:'silence', fam:'social', name:'let them talk', themes:['ego','solitude'],
 k:'let them {a}', h:'{b}', pairs:'a subject turned away from a crowd',
 bank:{a:['underestimate you','talk','doubt you','misread you'],
       b:['say nothing','keep building','let the work answer','stay unbothered']}},

{id:'proof', fam:'social', name:'they will ask how', themes:['ego','discipline'],
 k:'they’ll ask how', h:'after they see it', pairs:'someone working, unglamorous'},

{id:'yourSilence', fam:'social', name:'your silence is the answer', themes:['ego','solitude'],
 k:'your silence', h:'is the answer', pairs:'a closed mouth, a turned head'},

{id:'attentionRented', fam:'social', name:'attention is rented', themes:['attention','ego'],
 k:'attention is rented', h:'respect is earned', pairs:'a stage, a crowd, harsh light'},

{id:'outgrew', fam:'social', name:'you outgrew them', themes:['solitude','ego'],
 k:'you outgrew them', h:'that’s allowed', pairs:'someone leaving a lit room'},

{id:'doorsClose', fam:'social', name:'some doors close for you', themes:['healing','solitude'],
 k:'some doors close', h:'for you', pairs:'a closing door, a corridor'},

{id:'alone', fam:'social', name:'alone is not lonely', themes:['solitude'],
 k:'alone is not', h:'lonely', pairs:'one person, wide negative space'},

/* ---- work ---- */
{id:'consistency', fam:'work', name:'consistency beats intensity', themes:['work','discipline'],
 k:'consistency beats', h:'intensity', pairs:'repetition, a worn path'},

{id:'workDoesnt', fam:'work', name:'the work does not care', themes:['work','discipline'],
 k:'the work doesn’t care', h:'how you feel', pairs:'tools, hands, an unlit workshop'},

{id:'motivationLies', fam:'work', name:'motivation lies', themes:['work','discipline'],
 k:'motivation lies', h:'discipline doesn’t', pairs:'an alarm clock, a dark morning'},

{id:'unseen', fam:'work', name:'unseen work', themes:['work','ego'],
 k:'they see the result', h:'never the reps', pairs:'an empty gym, a lit stage'},

/* ---- attention ---- */
{id:'attentionPrice', fam:'attention', name:'your attention is the price', themes:['attention'],
 k:'your attention', h:'is the price', pairs:'screens, glow, a crowded feed'},

{id:'feedFed', fam:'attention', name:'you are being fed', themes:['attention'],
 k:'you’re not choosing', h:'you’re being fed', pairs:'a phone glow, a blank stare'},

/* ---- acceptance ---- */
{id:'someEnd', fam:'acceptance', name:'some things just end', themes:['healing','mortality'],
 k:'some things', h:'just end', pairs:'an empty chair, a last light'},

{id:'notYours', fam:'acceptance', name:'it was never yours', themes:['healing'],
 k:'it wasn’t taken', h:'it was never yours', pairs:'an open hand, water running out'}
];


/* ---- second voice: "drive" ----
   Uppercase, longer, built on a fork or a mirrored consequence rather than a
   split sentence. Two clauses that pivot against each other. Scored with looser
   length targets, because this register earns its length. */
const DRIVE = [
{id:'fork', fam:'fork', name:'you will either / or', themes:['identity','discipline'], voice:'drive',
 k:'you will either {a}', h:'or spend your life {b}', pairs:'a figure at a crossroads, hard side light',
 bank:{a:['become who you meant to be','build the thing','do the unglamorous work','back yourself'],
       b:['explaining why you did not','watching someone else do it','defending the excuse']}},

{id:'acceptOr', fam:'fork', name:'accept X or accept staying', themes:['discipline','comfort'], voice:'drive',
 k:'accept the {a}', h:'or accept staying exactly where you are', pairs:'sweat, strain, an unlit gym',
 bank:{a:['pain','cost','boredom','discomfort','early mornings']}},

{id:'mirror', fam:'fork', name:'mirrored consequence', themes:['discipline','time'], voice:'drive',
 k:'the cost of {a} is one hard hour', h:'the cost of skipping it is one lost year',
 pairs:'a clock, a repeated route, a worn floor',
 bank:{a:['showing up','the work','starting','discipline']}},

{id:'sameDay', fam:'fork', name:'same day / same year', themes:['discipline','time'], voice:'drive',
 k:'discipline makes every day look identical', h:'the alternative makes every year look identical',
 pairs:'repetition, the same room, the same street'},

{id:'pickHard', fam:'fork', name:'pick your hard', themes:['discipline','comfort'], voice:'drive',
 k:'staying is hard and leaving is hard', h:'pick the hard that pays you back',
 pairs:'two doors, a fork in a road'},

{id:'onlyWin', fam:'conditional', name:'you only win when', themes:['discipline','fear'], voice:'drive',
 k:'you only win when', h:'{a}', pairs:'a face in cold light, mid effort',
 bank:{a:['the mind outranks the mood','discipline outlasts the doubt',
          'you stop needing an audience','the standard survives the bad day']}},

{id:'testLevel', fam:'conditional', name:'the test comes first', themes:['fear','work'], voice:'drive',
 k:'the test always arrives', h:'right before the level does', pairs:'a storm, a hill, a hard climb'},

{id:'seasonPrep', fam:'conditional', name:'not punishment, preparation', themes:['healing','work'], voice:'drive',
 k:'this season is not punishment', h:'it is preparation', pairs:'winter light, a long empty road'},

{id:'betterThan', fam:'comparative', name:'better than I was', themes:['ego','identity'], voice:'drive',
 k:'not better than anyone else', h:'better than {a}', pairs:'a mirror, a training room',
 bank:{a:['the version who quit','who you were last year','yesterday']}},

{id:'monthsFrom', fam:'comparative', name:'months from now', themes:['time','discipline'], voice:'drive',
 k:'{a} months from now', h:'you will wish you had started today',
 pairs:'a calendar, a sunrise, a starting line',
 bank:{a:['six','twelve','three']}},

{id:'standardsNotFeelings', fam:'standard', name:'standards, not feelings', themes:['discipline','work'], voice:'drive',
 k:'move on your standards', h:'not on your feelings', pairs:'an alarm, a dark morning'},

{id:'feelingsLoud', fam:'standard', name:'feelings are loud', themes:['discipline','fear'], voice:'drive',
 k:'your feelings will always be loud', h:'let the discipline be louder', pairs:'noise, a crowd, harsh light'},

{id:'raiseStandard', fam:'standard', name:'raise the standard', themes:['work','discipline'], voice:'drive',
 k:'raise the standard first', h:'the results are downstream', pairs:'a bar, a ladder, a summit'},

{id:'notOwed', fam:'standard', name:'nothing is owed', themes:['ego','work'], voice:'drive',
 k:'nothing out here is owed to you', h:'all of it is earned', pairs:'an empty arena, a closed gate'},

{id:'goQuiet', fam:'proof', name:'go quiet, come back different', themes:['solitude','work'], voice:'drive',
 k:'go quiet for a season', h:'come back unrecognisable', pairs:'a figure walking into fog or dark'},

{id:'stopAnnouncing', fam:'proof', name:'stop announcing it', themes:['ego','work'], voice:'drive',
 k:'stop announcing what you are going to do', h:'come back holding the proof',
 pairs:'someone working alone, unwatched'},

{id:'underCommitted', fam:'proof', name:'not overwhelmed, under-committed', themes:['fear','discipline'], voice:'drive',
 k:'you are not overwhelmed', h:'you are under committed', pairs:'a cluttered desk, a lit screen at night'},

{id:'reasonsExcuses', fam:'proof', name:'reasons are still excuses', themes:['fear','discipline'], voice:'drive',
 k:'your reasons are real', h:'they are still the thing stopping you',
 pairs:'a face half in shadow, arms folded'},

{id:'mediocrityTrap', fam:'proof', name:'mediocrity is comfortable', themes:['comfort','fear'], voice:'drive',
 k:'mediocrity is comfortable', h:'that is exactly the trap', pairs:'a warm sofa, blue TV light'},

{id:'takePersonally', fam:'proof', name:'take it personally', themes:['discipline','time'], voice:'drive',
 k:'it is time', h:'take the next twelve months personally', pairs:'a starting line, a dark morning'}
];

PATTERNS.push.apply(PATTERNS, DRIVE);

/* ---- third voice: "mix" ----
   The hybrid. Takes the fork and the mirrored consequence from the drive voice
   and compresses them to stoic length: two clauses that pivot, but short enough
   to read at thumbnail size, and set lowercase. Usually the strongest of the
   three, because the device is the interesting part and the length was the
   thing costing it reach. */
const MIX = [
{id:'mxAccept', fam:'fork', name:'accept it or accept this', themes:['discipline','comfort'], voice:'mix',
 k:'accept the {a}', h:'or accept this', pairs:'strain, an unlit room, a hard surface',
 bank:{a:['cost','pain','boredom','discomfort']}},

{id:'mxHour', fam:'fork', name:'one hour or one year', themes:['discipline','time'], voice:'mix',
 k:'one hard hour', h:'or one lost year', pairs:'a clock, a worn floor, repetition'},

{id:'mxSameDay', fam:'fork', name:'the days / the years', themes:['discipline','time'], voice:'mix',
 k:'the days look the same', h:'the years will not', pairs:'the same street, the same room'},

{id:'mxPickHard', fam:'fork', name:'pick your hard', themes:['comfort','discipline'], voice:'mix',
 k:'pick your hard', h:'both cost you', pairs:'two doors, a fork in a road'},

{id:'mxBecome', fam:'fork', name:'become it or explain it', themes:['identity','fear'], voice:'mix',
 k:'become it', h:'or explain it forever', pairs:'a figure at a crossroads'},

{id:'mxWin', fam:'conditional', name:'you win when', themes:['discipline','fear'], voice:'mix',
 k:'you win when', h:'{a}', pairs:'a face in cold light',
 bank:{a:['the mind outranks the mood','the standard survives','you stop needing applause']}},

{id:'mxTest', fam:'conditional', name:'the test comes first', themes:['fear','work'], voice:'mix',
 k:'the test comes', h:'before the level', pairs:'a hill, a storm, a climb'},

{id:'mxSeason', fam:'conditional', name:'not punishment', themes:['healing','work'], voice:'mix',
 k:'this is not punishment', h:'it is preparation', pairs:'winter light, an empty road'},

{id:'mxBetter', fam:'comparative', name:'better than', themes:['ego','identity'], voice:'mix',
 k:'not better than them', h:'better than {a}', pairs:'a mirror, a training room',
 bank:{a:['yesterday','the one who quit','last year']}},

{id:'mxMonths', fam:'comparative', name:'months from now', themes:['time','discipline'], voice:'mix',
 k:'six months from now', h:'you will wish you started', pairs:'a calendar, a starting line'},

{id:'mxStandard', fam:'standard', name:'standards not moods', themes:['discipline','work'], voice:'mix',
 k:'move on standards', h:'not on moods', pairs:'an alarm, a dark morning'},

{id:'mxLoud', fam:'standard', name:'be louder', themes:['discipline','fear'], voice:'mix',
 k:'the doubt is loud', h:'be louder', pairs:'noise, a crowd, harsh light'},

{id:'mxOwed', fam:'standard', name:'nothing is owed', themes:['ego','work'], voice:'mix',
 k:'nothing is owed', h:'all of it is earned', pairs:'an empty arena, a closed gate'},

{id:'mxQuiet', fam:'proof', name:'go quiet', themes:['solitude','work'], voice:'mix',
 k:'go quiet', h:'come back different', pairs:'a figure walking into dark or fog'},

{id:'mxProof', fam:'proof', name:'come back with proof', themes:['ego','work'], voice:'mix',
 k:'stop announcing it', h:'come back with proof', pairs:'someone working alone'},

{id:'mxCommit', fam:'proof', name:'under committed', themes:['fear','discipline'], voice:'mix',
 k:'not overwhelmed', h:'under committed', pairs:'a cluttered desk, a screen at night'},

{id:'mxReasons', fam:'proof', name:'reasons still stop you', themes:['fear','discipline'], voice:'mix',
 k:'your reasons are real', h:'they still stop you', pairs:'a face half in shadow'},

{id:'mxTrap', fam:'proof', name:'that is the trap', themes:['comfort','fear'], voice:'mix',
 k:'mediocrity is comfortable', h:'that is the trap', pairs:'a warm sofa, blue TV light'}
];

PATTERNS.push.apply(PATTERNS, MIX);

/* ---- the mix voice, widened ----
   Short enough to read at thumbnail size, built on a pivot, and reaching well
   past discipline into the things most people actually carry: failing, family,
   money, rest, envy, regret, being enough. Fewer words, more weight. */
const MIX2 = [

/* failure and losing */
{id:'m_lostTaught', fam:'loss', name:'losing taught you', themes:['failure','work'], voice:'mix',
 k:'losing taught you', h:'winning never would', pairs:'someone sitting alone after the fact'},
{id:'m_notBehind', fam:'loss', name:'not behind', themes:['failure','time'], voice:'mix',
 k:'you are not behind', h:'you are just early', pairs:'an empty road at dawn'},
{id:'m_itDidnt', fam:'loss', name:'it did not work, you did', themes:['failure','identity'], voice:'mix',
 k:'it did not work', h:'you did', pairs:'a closed shutter, a dark shopfront'},
{id:'m_redirect', fam:'loss', name:'rejected, redirected', themes:['failure','healing'], voice:'mix',
 k:'rejected', h:'then redirected', pairs:'a fork in a road, a closed door'},
{id:'m_lostPlan', fam:'loss', name:'lost the plan', themes:['failure','purpose'], voice:'mix',
 k:'you lost the plan', h:'not the point', pairs:'a torn map, a wrong turn'},
{id:'m_failFast', fam:'loss', name:'fail in private', themes:['failure','ego'], voice:'mix',
 k:'fail in private', h:'return in public', pairs:'an unlit room, a lit stage'},
{id:'m_scars', fam:'loss', name:'the scar is proof', themes:['failure','healing'], voice:'mix',
 k:'the scar is not the wound', h:'it is the proof', pairs:'hands, weathered skin'},

/* family */
{id:'m_callThem', fam:'kin', name:'call them today', themes:['family','mortality'], voice:'mix',
 k:'call them today', h:'not someday', pairs:'a phone on a table, an empty chair'},
{id:'m_aging', fam:'kin', name:'they are aging', themes:['family','time'], voice:'mix',
 k:'they are getting older', h:'in real time', pairs:'an older hand, a doorway, a window'},
{id:'m_youHaveTime', fam:'kin', name:'you have time, they do not', themes:['family','mortality'], voice:'mix',
 k:'you have time', h:'they have less', pairs:'two figures, one older'},
{id:'m_beThere', fam:'kin', name:'be there for it', themes:['family','love'], voice:'mix',
 k:'be there for it', h:'not just for photos', pairs:'a kitchen, a table, warm light'},
{id:'m_homeLater', fam:'kin', name:'go home', themes:['family','regret'], voice:'mix',
 k:'go home more', h:'you will want to have', pairs:'a lit house at night'},
{id:'m_builtFor', fam:'kin', name:'who you are doing it for', themes:['family','purpose'], voice:'mix',
 k:'remember who', h:'you are doing it for', pairs:'a photograph in a wallet'},

/* joy, positivity, gratitude */
{id:'m_joyPractice', fam:'joy', name:'joy is a practice', themes:['joy','healing'], voice:'mix',
 k:'joy is', h:'a practice', pairs:'sunlight, movement, an open window'},
{id:'m_allowed', fam:'joy', name:'you are allowed', themes:['joy','worth'], voice:'mix',
 k:'you are allowed', h:'to be happy now', pairs:'someone laughing, unposed'},
{id:'m_noticeIt', fam:'joy', name:'notice it', themes:['joy','gratitude'], voice:'mix',
 k:'notice it', h:'while it is happening', pairs:'an ordinary golden moment'},
{id:'m_quietJoy', fam:'joy', name:'happiness is quiet', themes:['joy','attention'], voice:'mix',
 k:'happiness is quiet', h:'that is why you miss it', pairs:'a still room, soft light'},
{id:'m_smallDays', fam:'joy', name:'small days count', themes:['joy','gratitude'], voice:'mix',
 k:'the small days', h:'count too', pairs:'a plain street, ordinary weather'},
{id:'m_prayedFor', fam:'joy', name:'you prayed for this', themes:['gratitude','healing'], voice:'mix',
 k:'you once prayed', h:'for all of this', pairs:'a modest home, an ordinary evening'},
{id:'m_someoneWants', fam:'joy', name:'someone wants your ordinary', themes:['gratitude','envy'], voice:'mix',
 k:'someone is praying', h:'for your ordinary day', pairs:'a quiet domestic scene'},
{id:'m_letEasy', fam:'joy', name:'let it be easy', themes:['joy','rest'], voice:'mix',
 k:'let it be easy', h:'sometimes', pairs:'still water, a hammock, soft light'},
{id:'m_chasePeace', fam:'joy', name:'chase peace', themes:['joy','ego'], voice:'mix',
 k:'chase peace', h:'not applause', pairs:'an empty shoreline'},

/* love */
{id:'m_sayItNow', fam:'bond', name:'say it now', themes:['love','regret'], voice:'mix',
 k:'say it now', h:'not later', pairs:'two people, close, warm light'},
{id:'m_loveLoud', fam:'bond', name:'love loudly', themes:['love','mortality'], voice:'mix',
 k:'love loudly', h:'time is short', pairs:'an embrace, a lit doorway'},
{id:'m_chooseDaily', fam:'bond', name:'choose them daily', themes:['love','discipline'], voice:'mix',
 k:'choose them', h:'on the dull days too', pairs:'an ordinary shared morning'},
{id:'m_softBrave', fam:'bond', name:'soft is brave', themes:['love','fear'], voice:'mix',
 k:'staying soft', h:'is the braver thing', pairs:'an open hand, a calm face'},
{id:'m_fewReal', fam:'bond', name:'few, real', themes:['solitude','love'], voice:'mix',
 k:'few people', h:'real ones', pairs:'two figures in a wide frame'},
{id:'m_witnesses', fam:'bond', name:'some are witnesses', themes:['solitude','change'], voice:'mix',
 k:'some were friends', h:'some were witnesses', pairs:'a crowd blurring past'},

/* envy and comparison */
{id:'m_compareLess', fam:'envy', name:'compare less', themes:['envy','joy'], voice:'mix',
 k:'compare less', h:'live more', pairs:'a phone glow against a real view'},
{id:'m_chapter', fam:'envy', name:'their chapter, your chapter', themes:['envy','time'], voice:'mix',
 k:'their chapter twenty', h:'your chapter two', pairs:'an open book, a long staircase'},
{id:'m_highlight', fam:'envy', name:'highlight vs behind', themes:['envy','attention'], voice:'mix',
 k:'their highlights', h:'your whole footage', pairs:'a bright screen in a dim room'},
{id:'m_watching', fam:'envy', name:'watching, not living', themes:['envy','attention'], voice:'mix',
 k:'you are watching', h:'not living', pairs:'a face lit only by a screen'},

/* regret */
{id:'m_regretNot', fam:'acceptance', name:'regret the not trying', themes:['regret','fear'], voice:'mix',
 k:'you will not regret failing', h:'you will regret not going', pairs:'a departing train'},
{id:'m_hadItGood', fam:'acceptance', name:'you had it good', themes:['regret','gratitude'], voice:'mix',
 k:'you had it good', h:'and did not know', pairs:'an old photograph, a familiar street'},
{id:'m_wantBack', fam:'acceptance', name:'you will want this back', themes:['regret','time'], voice:'mix',
 k:'one day', h:'you will want this back', pairs:'an ordinary evening, warm light'},

/* rest and burnout */
{id:'m_restWork', fam:'rest', name:'rest is part of it', themes:['rest','work'], voice:'mix',
 k:'rest is', h:'part of the work', pairs:'an unmade bed, morning light'},
{id:'m_depleted', fam:'rest', name:'not lazy, depleted', themes:['rest','healing'], voice:'mix',
 k:'not lazy', h:'depleted', pairs:'someone slumped in low light'},
{id:'m_burnoutDebt', fam:'rest', name:'burnout is debt', themes:['rest','health'], voice:'mix',
 k:'burnout is', h:'unpaid rest', pairs:'a desk lamp at 3am'},
{id:'m_sleepDecision', fam:'rest', name:'sleep is a decision', themes:['rest','discipline'], voice:'mix',
 k:'sleep is', h:'a decision', pairs:'a dark bedroom, a phone face down'},
{id:'m_slowDown', fam:'rest', name:'slow down to arrive', themes:['rest','purpose'], voice:'mix',
 k:'slow down', h:'or be stopped', pairs:'a long road, fading light'},

/* worth */
{id:'m_tooMuch', fam:'worth', name:'not too much', themes:['worth','solitude'], voice:'mix',
 k:'you are not too much', h:'they were not enough', pairs:'one figure, wide empty frame'},
{id:'m_wrongRooms', fam:'worth', name:'wrong rooms', themes:['worth','envy'], voice:'mix',
 k:'you were picked last', h:'by the wrong rooms', pairs:'an emptying hall'},
{id:'m_youAreStandard', fam:'worth', name:'you are the standard', themes:['worth','ego'], voice:'mix',
 k:'you are the standard', h:'act like it', pairs:'a figure in strong side light'},
{id:'m_safePlace', fam:'worth', name:'be your own safe place', themes:['worth','healing'], voice:'mix',
 k:'be your own', h:'safe place', pairs:'a lit window from outside'},
{id:'m_hardOnSelf', fam:'worth', name:'hard on yourself is not discipline', themes:['worth','discipline'], voice:'mix',
 k:'hard on yourself', h:'is not discipline', pairs:'a mirror, harsh light'},

/* health and the body */
{id:'m_trainTreat', fam:'body', name:'train now or treat later', themes:['health','discipline'], voice:'mix',
 k:'train now', h:'or treat it later', pairs:'a gym, a hospital corridor'},
{id:'m_cheapFood', fam:'body', name:'cheap food, expensive doctor', themes:['health','money'], voice:'mix',
 k:'cheap food', h:'expensive doctor', pairs:'fast food neon at night'},
{id:'m_moveToday', fam:'body', name:'move today', themes:['health','time'], voice:'mix',
 k:'move today', h:'or ache tomorrow', pairs:'stairs, a road, early light'},
{id:'m_bodyLast', fam:'body', name:'the body keeps going', themes:['health','mortality'], voice:'mix',
 k:'you get one body', h:'no upgrades', pairs:'hands, a spine, honest light'},

/* money, plainly */
{id:'m_brokeCheap', fam:'cost', name:'broke and cheap', themes:['money','worth'], voice:'mix',
 k:'broke is temporary', h:'cheap is a character', pairs:'a wallet, a cold shop'},
{id:'m_toolNotScore', fam:'cost', name:'money is a tool', themes:['money','ego'], voice:'mix',
 k:'money is a tool', h:'not a scoreboard', pairs:'understated luxury, cold light'},
{id:'m_paidQuiet', fam:'cost', name:'get paid quietly', themes:['money','solitude'], voice:'mix',
 k:'earn loudly', h:'live quietly', pairs:'a plain car, an expensive watch'},

/* change and starting over */
{id:'m_newLife', fam:'restart', name:'the new life costs the old', themes:['change','identity'], voice:'mix',
 k:'the new life', h:'costs the old one', pairs:'a packed bag, an empty room'},
{id:'m_startUgly', fam:'restart', name:'start ugly', themes:['change','fear'], voice:'mix',
 k:'start ugly', h:'start anyway', pairs:'a first attempt, rough hands'},
{id:'m_anyDay', fam:'restart', name:'restart any day', themes:['change','healing'], voice:'mix',
 k:'you can restart', h:'on any ordinary day', pairs:'a plain Tuesday, a lit doorway'},
{id:'m_outgrowNoApology', fam:'restart', name:'outgrow without apology', themes:['change','worth'], voice:'mix',
 k:'outgrow it', h:'without the apology', pairs:'someone leaving a lit room'},
{id:'m_burnBoats', fam:'restart', name:'leave the door', themes:['change','fear'], voice:'mix',
 k:'stop leaving', h:'a door open behind you', pairs:'a closing door, a long corridor'},

/* purpose */
{id:'m_busyBuilding', fam:'purpose', name:'busy is not building', themes:['purpose','work'], voice:'mix',
 k:'busy is not', h:'building', pairs:'a crowded desk, a full calendar'},
{id:'m_meanSomething', fam:'purpose', name:'make it mean something', themes:['purpose','identity'], voice:'mix',
 k:'make it mean something', h:'or do not do it', pairs:'a workshop, a single lamp'},
{id:'m_whyFirst', fam:'purpose', name:'why before how', themes:['purpose','discipline'], voice:'mix',
 k:'the why', h:'carries the how', pairs:'a long climb, a distant summit'},
{id:'m_smallRoom', fam:'purpose', name:'outgrow the small room', themes:['purpose','change'], voice:'mix',
 k:'you outgrew the room', h:'not the dream', pairs:'a small flat, a wide window'},

/* self, plainly */
{id:'m_problemFix', fam:'identity', name:'the problem and the fix', themes:['identity','worth'], voice:'mix',
 k:'you are the problem', h:'and the fix', pairs:'a mirror, direct gaze'},
{id:'m_avoiding', fam:'identity', name:'not busy, avoiding', themes:['fear','attention'], voice:'mix',
 k:'you are not busy', h:'you are avoiding', pairs:'a cluttered desk, a lit phone'},
{id:'m_clockNegotiate', fam:'time', name:'the clock does not negotiate', themes:['time','mortality'], voice:'mix',
 k:'the clock', h:'does not negotiate', pairs:'a station clock, a long platform'},
{id:'m_becomeQuietly', fam:'identity', name:'become quietly', themes:['identity','solitude'], voice:'mix',
 k:'change quietly', h:'let them notice late', pairs:'a figure walking away from light'}
];

PATTERNS.push.apply(PATTERNS, MIX2);

/* ---- staying yourself ----
   The one territory the discipline accounts never touch, and the one most
   people actually need: being odd on purpose, and not filing the edges off. */
const SELFHOOD = [
{id:'w_stayWeird', fam:'self', name:'stay weird', themes:['authentic','joy'], voice:'mix',
 k:'stay weird', h:'that is the point', pairs:'someone unusual, unposed, lit oddly'},
{id:'w_notBlend', fam:'self', name:'not made to blend', themes:['authentic','worth'], voice:'mix',
 k:'you were not made', h:'to blend in', pairs:'one bright figure in a grey crowd'},
{id:'w_normalCostume', fam:'self', name:'normal is a costume', themes:['authentic','ego'], voice:'mix',
 k:'normal is', h:'a costume', pairs:'a mask, a uniform, identical windows'},
{id:'w_weirdEarly', fam:'self', name:'weird is early', themes:['authentic','change'], voice:'mix',
 k:'weird is just', h:'early', pairs:'an odd silhouette against a plain wall'},
{id:'w_fittingCost', fam:'self', name:'fitting in cost you', themes:['authentic','regret'], voice:'mix',
 k:'fitting in', h:'cost you years', pairs:'rows of identical seats'},
{id:'w_tooMuchRight', fam:'self', name:'too much for the right people', themes:['authentic','love'], voice:'mix',
 k:'be too much', h:'for the right people', pairs:'someone laughing loudly, alone in frame'},
{id:'w_stopTranslating', fam:'self', name:'stop translating yourself', themes:['authentic','worth'], voice:'mix',
 k:'stop translating', h:'yourself for them', pairs:'a face mid-sentence, unheard'},
{id:'w_maskHeavier', fam:'self', name:'the mask is heavier', themes:['authentic','rest'], voice:'mix',
 k:'the mask', h:'is heavier than the truth', pairs:'a reflection, a half-turned face'},
{id:'w_wereFine', fam:'self', name:'you were fine before', themes:['authentic','attention'], voice:'mix',
 k:'you were fine', h:'before the comments', pairs:'a lit phone, a dimming face'},
{id:'w_tasteMoat', fam:'self', name:'your taste is the moat', themes:['authentic','purpose'], voice:'mix',
 k:'your taste', h:'is the whole moat', pairs:'a cluttered studio, personal objects'},
{id:'w_copyNobody', fam:'self', name:'copy nobody', themes:['authentic','work'], voice:'mix',
 k:'study everybody', h:'copy nobody', pairs:'a wall of references, one desk'},
{id:'w_oddOriginal', fam:'self', name:'odd is original', themes:['authentic','identity'], voice:'mix',
 k:'odd', h:'is just original', pairs:'an unusual profile in hard light'},
{id:'w_unshrink', fam:'self', name:'stop shrinking', themes:['authentic','worth'], voice:'mix',
 k:'you learned to shrink', h:'you can unlearn it', pairs:'a figure straightening up'},
{id:'w_theyAdjust', fam:'self', name:'they will adjust', themes:['authentic','ego'], voice:'mix',
 k:'be yourself', h:'they will adjust', pairs:'someone walking through a crowd'},
{id:'w_differentProduct', fam:'self', name:'different is the product', themes:['authentic','purpose'], voice:'mix',
 k:'different is not the risk', h:'it is the product', pairs:'one odd object among plain ones'},
{id:'w_lonelyBrief', fam:'self', name:'the odd road is quiet first', themes:['authentic','solitude'], voice:'mix',
 k:'the odd road is quiet', h:'then it is yours', pairs:'a single figure on an empty road'}
];

PATTERNS.push.apply(PATTERNS, SELFHOOD);

/* ---- there is no tomorrow ----
   Urgency without the shouting. Tomorrow treated as a fiction you keep buying. */
const NOW = [
{id:'n_noTomorrow', fam:'urgency', name:'there is no tomorrow', themes:['time','mortality'], voice:'mix',
 k:'there is no tomorrow', h:'there is only this', pairs:'a last light, a closing day'},
{id:'n_storyFact', fam:'urgency', name:'tomorrow is a story', themes:['time','fear'], voice:'mix',
 k:'tomorrow is a story', h:'today is the fact', pairs:'an open notebook, a hard deadline'},
{id:'n_keepsSaying', fam:'urgency', name:'tomorrow keeps saying no', themes:['time','regret'], voice:'mix',
 k:'you keep saying tomorrow', h:'tomorrow keeps saying no', pairs:'a calendar, crossed-out days'},
{id:'n_perfectTime', fam:'urgency', name:'the perfect time passed', themes:['time','change'], voice:'mix',
 k:'the perfect time', h:'already went by', pairs:'a departing train, an empty platform'},
{id:'n_mondaySunday', fam:'urgency', name:'waiting for monday', themes:['time','comfort'], voice:'mix',
 k:'waiting for monday', h:'is losing today', pairs:'a quiet weekend room'},
{id:'n_neverCame', fam:'urgency', name:'later never came', themes:['time','regret'], voice:'mix',
 k:'later never came', h:'for anybody', pairs:'a dusty unopened box'},
{id:'n_notReadier', fam:'urgency', name:'you will not feel readier', themes:['fear','change'], voice:'mix',
 k:'go now', h:'you will not feel readier', pairs:'someone at a threshold'},
{id:'n_countdown', fam:'urgency', name:'the count is running', themes:['mortality','time'], voice:'mix',
 k:'the count started', h:'the day you did', pairs:'a station clock, a long corridor'},
{id:'n_someoneLast', fam:'urgency', name:'one of these is the last', themes:['mortality','family'], voice:'mix',
 k:'one of these days', h:'is the last one', pairs:'an ordinary evening, warm light'}
];

PATTERNS.push.apply(PATTERNS, NOW);

/* ---- the canonical genre lines ----
   Short aphorisms that circulate across this whole niche with no identifiable
   author. Short phrases are not copyrightable and none of these belong to one
   account, so they are here as first-class patterns. Deliberately excluded:
   anything traceable to a named author or a trademark. */
const COMMON = [
{id:'c_costsPeace', fam:'worth', name:'if it costs your peace', themes:['worth','comfort'], voice:'mix',
 k:'if it costs your peace', h:'it is too expensive', pairs:'a calm room, a closed door'},
{id:'c_allowContinue', fam:'standard', name:'what you allow continues', themes:['worth','discipline'], voice:'mix',
 k:'what you allow', h:'will continue', pairs:'a repeated scene, the same room'},
{id:'c_tolerate', fam:'standard', name:'you become what you tolerate', themes:['identity','worth'], voice:'mix',
 k:'you become', h:'what you tolerate', pairs:'a mirror, a worn chair'},
{id:'c_closedMouths', fam:'imperative', name:'closed mouths', themes:['fear','money'], voice:'mix',
 k:'closed mouths', h:'do not get fed', pairs:'an empty table, a shut door'},
{id:'c_healingLinear', fam:'acceptance', name:'healing is not linear', themes:['healing','change'], voice:'mix',
 k:'healing is not linear', h:'keep going anyway', pairs:'a winding path, soft light'},
{id:'c_restProductive', fam:'rest', name:'rest is productive', themes:['rest','work'], voice:'mix',
 k:'rest is', h:'productive', pairs:'an unmade bed, morning light'},
{id:'c_startOver', fam:'restart', name:'allowed to start over', themes:['change','healing'], voice:'mix',
 k:'you are allowed', h:'to start over', pairs:'an open road, a first light'},
{id:'c_boundaries', fam:'worth', name:'boundaries are self respect', themes:['worth','solitude'], voice:'mix',
 k:'boundaries are', h:'self respect', pairs:'a fence, a threshold, a closed gate'},
{id:'c_energyCurrency', fam:'attention', name:'energy is currency', themes:['attention','rest'], voice:'mix',
 k:'energy is', h:'the real currency', pairs:'a dim lamp, a tired room'},
{id:'c_noResponse', fam:'social', name:'not everything needs a response', themes:['ego','solitude'], voice:'mix',
 k:'not everything', h:'needs a response', pairs:'a silent phone, a turned back'},
{id:'c_growThrough', fam:'acceptance', name:'grow through it', themes:['healing','change'], voice:'mix',
 k:'you grow through', h:'what you go through', pairs:'a plant in a crack, hard light'},
{id:'c_cannotHeal', fam:'restart', name:'cannot heal where you got sick', themes:['healing','change'], voice:'mix',
 k:'you cannot heal', h:'where you got sick', pairs:'a doorway out of a dim room'},
{id:'c_smallSteps', fam:'inversion', name:'small steps still forward', themes:['healing','discipline'], voice:'mix',
 k:'small steps', h:'are still forward', pairs:'a long staircase, one figure'},
{id:'c_emptyCup', fam:'rest', name:'empty cup', themes:['rest','love'], voice:'mix',
 k:'you cannot pour', h:'from an empty cup', pairs:'a cup, a kitchen, low light'},
{id:'c_meantForYou', fam:'acceptance', name:'what is meant for you', themes:['healing','gratitude'], voice:'mix',
 k:'what is meant for you', h:'will not miss you', pairs:'a horizon, still water'},
{id:'c_noFullSentence', fam:'imperative', name:'no is a full sentence', themes:['worth','solitude'], voice:'mix',
 k:'no', h:'is a full sentence', pairs:'a closed door, a calm face'},
{id:'c_deadPlants', fam:'bond', name:'stop watering dead plants', themes:['change','love'], voice:'mix',
 k:'stop watering', h:'dead plants', pairs:'a dry pot on a windowsill'},
{id:'c_lessonsNotLifetimes', fam:'bond', name:'lessons not lifetimes', themes:['change','love'], voice:'mix',
 k:'some people are lessons', h:'not lifetimes', pairs:'a crowd blurring past'},
{id:'c_futureSelf', fam:'identity', name:'your future self is watching', themes:['identity','discipline'], voice:'mix',
 k:'your future self', h:'is watching', pairs:'a mirror, a long hallway'},
{id:'c_doItTired', fam:'imperative', name:'do it tired', themes:['discipline','rest'], voice:'mix',
 k:'do it tired', h:'do it scared', pairs:'a dark morning, a lit doorway'},
{id:'c_nothingGrows', fam:'reframe', name:'nothing grows in comfort', themes:['comfort','change'], voice:'mix',
 k:'nothing grows', h:'in comfort', pairs:'a warm sofa, blue TV light'},
{id:'c_notForEveryone', fam:'self', name:'not for everyone', themes:['authentic','worth'], voice:'mix',
 k:'you are not for everyone', h:'that is the point', pairs:'one figure apart from a crowd'},
{id:'c_keepQuiet', fam:'proof', name:'keep it quiet', themes:['ego','work'], voice:'mix',
 k:'keep it quiet', h:'keep it moving', pairs:'someone walking away from light'},
{id:'c_hurtPeople', fam:'acceptance', name:'hurt people', themes:['healing','love'], voice:'mix',
 k:'hurt people', h:'hurt people', pairs:'two figures, distance between them'},
{id:'c_rightPeopleHome', fam:'bond', name:'the right people feel like home', themes:['love','family'], voice:'mix',
 k:'the right people', h:'feel like home', pairs:'a lit window, a warm kitchen'},
{id:'c_owedApology', fam:'worth', name:'you owe you', themes:['worth','healing'], voice:'mix',
 k:'you owe yourself', h:'an apology', pairs:'a mirror, soft light'},
{id:'c_trustTiming', fam:'acceptance', name:'trust the timing', themes:['time','gratitude'], voice:'mix',
 k:'trust the timing', h:'of your own life', pairs:'a long horizon, slow light'},
{id:'c_peaceOver', fam:'joy', name:'peace over everything', themes:['joy','worth'], voice:'mix',
 k:'peace', h:'over everything', pairs:'still water, an empty shoreline'},
{id:'c_romanticise', fam:'joy', name:'romanticise your life', themes:['joy','gratitude'], voice:'mix',
 k:'romanticise your life', h:'it is the only one', pairs:'an ordinary street made golden'},
{id:'c_beTheReason', fam:'joy', name:'be the reason', themes:['love','joy'], voice:'mix',
 k:'be the reason', h:'someone keeps going', pairs:'two people, a shared moment'}
];

PATTERNS.push.apply(PATTERNS, COMMON);

/* ---- friendship ----
   The one relationship nobody writes posters about, and the one that quietly
   decides most people's twenties and thirties. Split across two families so
   more than one can surface in a single recommendation set. */
const FRIENDS = [
{id:'f_whoStayed', fam:'bond', name:'the ones who stayed', themes:['friendship','gratitude'], voice:'mix',
 k:'the ones who stayed', h:'said everything', pairs:'two figures, a long quiet street'},
{id:'f_textFirst', fam:'circle', name:'be the one who texts first', themes:['friendship','love'], voice:'mix',
 k:'be the one', h:'who texts first', pairs:'a lit phone on a table, warm room'},
{id:'f_alwaysYou', fam:'circle', name:'if it is always you', themes:['friendship','worth'], voice:'mix',
 k:'if it is always you', h:'it is not a friendship', pairs:'one chair pulled out, one empty'},
{id:'f_grewApart', fam:'bond', name:'growing apart is not betrayal', themes:['friendship','change'], voice:'mix',
 k:'growing apart', h:'is not betrayal', pairs:'two paths splitting in low light'},
{id:'f_oneReal', fam:'circle', name:'one real friend', themes:['friendship','solitude'], voice:'mix',
 k:'one real friend', h:'beats a full room', pairs:'a crowded bar, two people talking'},
{id:'f_calendar', fam:'circle', name:'adult friendship is a calendar', themes:['friendship','time'], voice:'mix',
 k:'adult friendship', h:'is just a calendar', pairs:'a diary, a table set for two'},
{id:'f_checkStrong', fam:'bond', name:'check on the strong ones', themes:['friendship','healing'], voice:'mix',
 k:'check on', h:'the strong ones', pairs:'a composed face, tired eyes'},
{id:'f_theyShowed', fam:'circle', name:'they showed up', themes:['friendship','gratitude'], voice:'mix',
 k:'they showed up', h:'remember that forever', pairs:'a doorway, rain, someone arriving'},
{id:'f_quietClap', fam:'bond', name:'not everyone claps', themes:['friendship','envy'], voice:'mix',
 k:'not everyone', h:'claps when you win', pairs:'a small crowd, uneven light'},
{id:'f_groupQuiet', fam:'circle', name:'the group got quiet', themes:['friendship','change'], voice:'mix',
 k:'the group got quiet', h:'you got busy', pairs:'a dim room, empty chairs'},
{id:'f_loyaltyRare', fam:'bond', name:'loyalty is boring and rare', themes:['friendship','worth'], voice:'mix',
 k:'loyalty is boring', h:'that is why it is rare', pairs:'two people, ordinary evening'},
{id:'f_beTheFriend', fam:'circle', name:'be the friend you needed', themes:['friendship','love'], voice:'mix',
 k:'be the friend', h:'you needed then', pairs:'a hand on a shoulder, warm light'},
{id:'f_loseForGrowing', fam:'bond', name:'you lose people for growing', themes:['friendship','change'], voice:'mix',
 k:'you will lose people', h:'for growing', pairs:'someone leaving a lit room'},
{id:'f_threeAm', fam:'circle', name:'the 3am list is short', themes:['friendship','solitude'], voice:'mix',
 k:'the list of people', h:'you can call at three', pairs:'a phone glowing in the dark'},
{id:'f_silenceNot', fam:'bond', name:'distance is fine, silence is not', themes:['friendship','love'], voice:'mix',
 k:'distance is fine', h:'silence is not', pairs:'a long road between two lights'},
{id:'f_oldFriends', fam:'circle', name:'old friends know the old you', themes:['friendship','identity'], voice:'mix',
 k:'old friends', h:'knew the old you', pairs:'an old photograph, familiar faces'},
{id:'f_doorsPeople', fam:'bond', name:'some doors were people', themes:['friendship','regret'], voice:'mix',
 k:'some doors', h:'were people', pairs:'a closing door, a corridor'},
{id:'f_showUpTwice', fam:'circle', name:'friendship is showing up twice', themes:['friendship','discipline'], voice:'mix',
 k:'anyone shows up once', h:'friends show up twice', pairs:'rain, a doorway, someone waiting'},
{id:'f_callBack', fam:'bond', name:'call them back', themes:['friendship','mortality'], voice:'mix',
 k:'call them back', h:'while you still can', pairs:'an unanswered phone, an empty room'},
{id:'f_fullRoomEmpty', fam:'circle', name:'a full room can be empty', themes:['friendship','solitude'], voice:'mix',
 k:'a full room', h:'can still be empty', pairs:'a party seen from the edge'},
{id:'f_seasonFriends', fam:'bond', name:'some were seasons', themes:['friendship','healing'], voice:'mix',
 k:'some were seasons', h:'not people you lost', pairs:'autumn light, a changing street'}
];

PATTERNS.push.apply(PATTERNS, FRIENDS);

/* ---- silence as the ego move ----
   Restraint rather than status. The ego theme was all proof and scoreboard;
   this is the other half of it — not replying, not explaining, not needing
   the last word. Own family so it can surface alongside the social patterns. */
const SILENCE = [
{id:'s_stayQuiet', fam:'silence', name:'stay quiet, let them wonder', themes:['ego','solitude'], voice:'mix',
 k:'stay quiet', h:'let them wonder', pairs:'a closed mouth, a turned head, low light'},
{id:'s_loudest', fam:'silence', name:'silence is the loudest', themes:['ego','worth'], voice:'mix',
 k:'silence', h:'is the loudest answer', pairs:'an empty room after an argument'},
{id:'s_sayLess', fam:'silence', name:'say less, mean more', themes:['ego','authentic'], voice:'mix',
 k:'say less', h:'mean more', pairs:'a still face, hard side light'},
{id:'s_arguing', fam:'silence', name:'arguing is losing', themes:['ego','attention'], voice:'mix',
 k:'arguing back', h:'is already losing', pairs:'two figures, one walking away'},
{id:'s_lastWord', fam:'silence', name:'the last word is not the win', themes:['ego','worth'], voice:'mix',
 k:'the last word', h:'is not the win', pairs:'a door closing mid-sentence'},
{id:'s_noReply', fam:'silence', name:'no reply is a reply', themes:['ego','solitude'], voice:'mix',
 k:'no reply', h:'is still a reply', pairs:'a phone face down on a table'},
{id:'s_quietConfidence', fam:'silence', name:'quiet confidence', themes:['ego','worth'], voice:'mix',
 k:'quiet confidence', h:'needs no witness', pairs:'someone composed, alone, unposed'},
{id:'s_moveQuietly', fam:'silence', name:'move quietly', themes:['ego','work'], voice:'mix',
 k:'move quietly', h:'let the results talk', pairs:'someone working unwatched, dim room'},
{id:'s_wantReaction', fam:'silence', name:'they want a reaction', themes:['ego','attention'], voice:'mix',
 k:'they want a reaction', h:'give them silence', pairs:'a crowd, one calm face'},
{id:'s_absence', fam:'silence', name:'answer with absence', themes:['ego','solitude'], voice:'mix',
 k:'answer them', h:'with your absence', pairs:'an empty chair at a full table'},
{id:'s_stopDefending', fam:'silence', name:'stop defending', themes:['ego','work'], voice:'mix',
 k:'stop defending it', h:'start delivering it', pairs:'a workbench, hands, no audience'},
{id:'s_loudInsecure', fam:'silence', name:'loud is insecure', themes:['ego','fear'], voice:'mix',
 k:'the loudest one', h:'is the least sure', pairs:'a bright stage, a quiet edge'},
{id:'s_strongestLeast', fam:'silence', name:'the strongest say the least', themes:['ego','discipline'], voice:'mix',
 k:'the strongest', h:'say the least', pairs:'a still figure, heavy shadow'},
{id:'s_swallowReply', fam:'silence', name:'swallow the reply', themes:['ego','healing'], voice:'mix',
 k:'swallow the reply', h:'keep the peace', pairs:'a held breath, a calm room'},
{id:'s_restraint', fam:'silence', name:'restraint is power', themes:['ego','discipline'], voice:'mix',
 k:'restraint', h:'is the power move', pairs:'a closed fist unclenching'},
{id:'s_letAssume', fam:'silence', name:'let them assume', themes:['ego','solitude'], voice:'mix',
 k:'let them assume', h:'they always will', pairs:'a figure walking past a crowd'},
{id:'s_neverExplain', fam:'silence', name:'explain rarely', themes:['ego','authentic'], voice:'mix',
 k:'explain rarely', h:'complain never', pairs:'a hard face, cold light'},
{id:'s_receiptsLater', fam:'silence', name:'no announcement', themes:['ego','work'], voice:'mix',
 k:'no announcement', h:'just the receipts later', pairs:'a lit desk, a closed door'}
];

PATTERNS.push.apply(PATTERNS, SILENCE);

/* ---- concept sweep ----
   Four more lines per concept, so every theme carries enough weight to be
   filtered on its own. Same compression rule as the rest of the mix voice. */
const SWEEP = [
/* discipline */
{id:'x_moodPasses', fam:'standard', name:'the mood passes', themes:['discipline','work'], voice:'mix',
 k:'the mood passes', h:'the work stays', pairs:'an alarm, a dark morning, a lit desk'},
{id:'x_doItBadly', fam:'imperative', name:'do it badly', themes:['discipline','fear'], voice:'mix',
 k:'do it badly', h:'but do it', pairs:'a rough first attempt, working hands'},
{id:'x_smallDaily', fam:'inversion', name:'small and daily', themes:['discipline','time'], voice:'mix',
 k:'small and daily', h:'beats big and never', pairs:'a worn path, a repeated route'},
{id:'x_needSystem', fam:'reframe', name:'you need a system', themes:['discipline','work'], voice:'mix',
 k:'you do not need drive', h:'you need a system', pairs:'a plain checklist, a clean desk'},
/* mortality */
{id:'x_notPromised', fam:'time', name:'not promised the second half', themes:['mortality','time'], voice:'mix',
 k:'you are not promised', h:'the second half', pairs:'dusk, a long road, a window'},
{id:'x_countSummers', fam:'time', name:'count the summers', themes:['mortality','family'], voice:'mix',
 k:'count the summers', h:'you have left', pairs:'late light, an open field'},
{id:'x_temporary', fam:'acceptance', name:'everyone is temporary', themes:['mortality','love'], voice:'mix',
 k:'everyone here', h:'is temporary', pairs:'a crowd blurring, a still figure'},
{id:'x_endingFixed', fam:'urgency', name:'the ending is fixed', themes:['mortality','purpose'], voice:'mix',
 k:'the ending is fixed', h:'the middle is not', pairs:'a long corridor, a far door'},
/* ego */
{id:'x_humbleOr', fam:'fork', name:'humble or humbled', themes:['ego','failure'], voice:'mix',
 k:'humble or humbled', h:'pick one', pairs:'a bowed head, hard light'},
{id:'x_nameNotWork', fam:'silence', name:'your name is not the work', themes:['ego','work'], voice:'mix',
 k:'your name', h:'is not the work', pairs:'an unsigned canvas, a quiet studio'},
{id:'x_creditCapable', fam:'comparative', name:'credit vs capability', themes:['ego','worth'], voice:'mix',
 k:'credit is nice', h:'capability is better', pairs:'an empty podium, a full workshop'},
{id:'x_impressiveNoOne', fam:'silence', name:'impressive to no one', themes:['ego','authentic'], voice:'mix',
 k:'be impressive', h:'to absolutely no one', pairs:'someone alone, mid-task, unlit'},
/* solitude */
{id:'x_sitWithSelf', fam:'imperative', name:'sit with yourself', themes:['solitude','rest'], voice:'mix',
 k:'learn to sit', h:'with yourself', pairs:'one chair, an empty room'},
{id:'x_emptyEvening', fam:'rest', name:'the empty evening', themes:['solitude','rest'], voice:'mix',
 k:'the empty evening', h:'is not a punishment', pairs:'a dim room, a single lamp'},
{id:'x_ownCompany', fam:'worth', name:'your own company', themes:['solitude','worth'], voice:'mix',
 k:'your own company', h:'is the first skill', pairs:'a figure walking alone, wide frame'},
{id:'x_aloneWithPlan', fam:'comparative', name:'alone with a plan', themes:['solitude','purpose'], voice:'mix',
 k:'alone with a plan', h:'beats surrounded and lost', pairs:'one lit window in a dark block'},
/* money */
{id:'x_spendThing', fam:'cost', name:'the thing not the look', themes:['money','authentic'], voice:'mix',
 k:'buy the thing', h:'not the look of it', pairs:'a plain object, honest light'},
{id:'x_notBrokeEarly', fam:'cost', name:'not broke, early', themes:['money','time'], voice:'mix',
 k:'you are not broke', h:'you are early', pairs:'a small flat, a big window'},
{id:'x_cheapDecades', fam:'cost', name:'cheap decisions', themes:['money','regret'], voice:'mix',
 k:'cheap decisions', h:'expensive decades', pairs:'a cluttered cheap room'},
{id:'x_wealthBoring', fam:'reframe', name:'wealth is boring', themes:['money','ego'], voice:'mix',
 k:'real wealth is boring', h:'that is the secret', pairs:'understated interior, cold light'},
/* comfort */
{id:'x_couchWins', fam:'reframe', name:'the couch wins', themes:['comfort','discipline'], voice:'mix',
 k:'the couch', h:'always wins the argument', pairs:'a sofa in blue TV light'},
{id:'x_safeProblem', fam:'negation', name:'safe is the problem', themes:['comfort','fear'], voice:'mix',
 k:'you are safe', h:'that is the problem', pairs:'a warm sealed room, a locked window'},
{id:'x_warmRooms', fam:'fork', name:'warm rooms, small lives', themes:['comfort','purpose'], voice:'mix',
 k:'warm rooms', h:'make small lives', pairs:'a cosy interior, a cold view outside'},
{id:'x_nothingHurts', fam:'fork', name:'nothing hurts, nothing changes', themes:['comfort','change'], voice:'mix',
 k:'nothing hurts', h:'nothing changes', pairs:'a still, unmoving room'},
/* fear */
{id:'x_feePayIt', fam:'reframe', name:'fear is a fee', themes:['fear','change'], voice:'mix',
 k:'the fear is a fee', h:'pay it and go', pairs:'a threshold, a lit doorway'},
{id:'x_rehearseDisaster', fam:'negation', name:'rehearsing the disaster', themes:['fear','attention'], voice:'mix',
 k:'you rehearse the disaster', h:'never the win', pairs:'a sleepless face, blue light'},
{id:'x_scaredDoing', fam:'conditional', name:'scared and doing it', themes:['fear','discipline'], voice:'mix',
 k:'scared and doing it', h:'is the whole skill', pairs:'someone stepping forward, hard light'},
{id:'x_worstCase', fam:'acceptance', name:'the worst case', themes:['fear','healing'], voice:'mix',
 k:'the worst case', h:'is usually survivable', pairs:'a storm passing, wet street'},
/* time */
{id:'x_lessThanThink', fam:'urgency', name:'less than you think', themes:['time','mortality'], voice:'mix',
 k:'you have less', h:'than you think', pairs:'a station clock, a long platform'},
{id:'x_hoursGo', fam:'time', name:'the hours go', themes:['time','regret'], voice:'mix',
 k:'the hours go', h:'whether you use them', pairs:'a window, moving light'},
{id:'x_unusedDay', fam:'cost', name:'you cannot bank a day', themes:['time','purpose'], voice:'mix',
 k:'you cannot bank', h:'an unused day', pairs:'a calendar, a crossed-out page'},
{id:'x_busyNotFull', fam:'negation', name:'busy is not full', themes:['time','purpose'], voice:'mix',
 k:'busy is not', h:'the same as full', pairs:'a packed calendar, an empty face'},
/* work */
{id:'x_habitFinishes', fam:'work', name:'habit finishes it', themes:['work','discipline'], voice:'mix',
 k:'talent starts it', h:'habit finishes it', pairs:'a half-built thing, tools'},
{id:'x_boringMoat', fam:'work', name:'the boring part is the moat', themes:['work','purpose'], voice:'mix',
 k:'the boring part', h:'is the whole moat', pairs:'repetitive work, unglamorous'},
{id:'x_amateursWait', fam:'comparative', name:'amateurs wait', themes:['work','fear'], voice:'mix',
 k:'amateurs wait', h:'professionals start', pairs:'a studio at dawn'},
{id:'x_finishSomething', fam:'imperative', name:'finish something', themes:['work','purpose'], voice:'mix',
 k:'finish something', h:'anything', pairs:'a completed object, honest light'},
/* healing */
{id:'x_stillSad', fam:'acceptance', name:'allowed to still be sad', themes:['healing','worth'], voice:'mix',
 k:'you are allowed', h:'to still be sad', pairs:'rain on a window, soft light'},
{id:'x_closureGive', fam:'reframe', name:'closure you give yourself', themes:['healing','change'], voice:'mix',
 k:'closure is something', h:'you give yourself', pairs:'a closed door, calm light'},
{id:'x_slowHealing', fam:'inversion', name:'slow healing is healing', themes:['healing','rest'], voice:'mix',
 k:'slow healing', h:'is still healing', pairs:'a scar, a plant, soft light'},
{id:'x_putItDown', fam:'imperative', name:'put it down', themes:['healing','regret'], voice:'mix',
 k:'you survived it', h:'now put it down', pairs:'an open hand, a dropped weight'},
/* attention */
{id:'x_watchBecome', fam:'attention', name:'what you watch you become', themes:['attention','identity'], voice:'mix',
 k:'what you watch', h:'you slowly become', pairs:'a face lit by a screen'},
{id:'x_feedNotLife', fam:'attention', name:'the feed is not your life', themes:['attention','envy'], voice:'mix',
 k:'the feed', h:'is not your life', pairs:'a bright phone in a dim room'},
{id:'x_keepEvening', fam:'imperative', name:'delete the app', themes:['attention','rest'], voice:'mix',
 k:'delete the app', h:'keep the evening', pairs:'a phone face down, a lit window'},
{id:'x_boredomIdeas', fam:'reframe', name:'boredom holds the ideas', themes:['attention','purpose'], voice:'mix',
 k:'boredom is where', h:'the ideas live', pairs:'an empty room, a long stare'},
/* identity */
{id:'x_worstWeek', fam:'identity', name:'not your worst week', themes:['identity','healing'], voice:'mix',
 k:'you are not', h:'your worst week', pairs:'a face in soft recovery light'},
{id:'x_actLikeBecoming', fam:'identity', name:'act like who you are becoming', themes:['identity','discipline'], voice:'mix',
 k:'act like the person', h:'you are becoming', pairs:'a mirror, straightened posture'},
{id:'x_changeInputs', fam:'identity', name:'change the inputs', themes:['identity','change'], voice:'mix',
 k:'change the inputs', h:'the person follows', pairs:'a bookshelf, a clean desk'},
{id:'x_draftNotVerdict', fam:'identity', name:'a draft, not a verdict', themes:['identity','healing'], voice:'mix',
 k:'you are a draft', h:'not a verdict', pairs:'a marked-up page, a working desk'},
/* failure */
{id:'x_firstVersion', fam:'loss', name:'the first version is bad', themes:['failure','work'], voice:'mix',
 k:'the first version', h:'is supposed to be bad', pairs:'a rough sketch, a lit table'},
{id:'x_beginnerNotInsult', fam:'loss', name:'beginner is not an insult', themes:['failure','fear'], voice:'mix',
 k:'beginner is not', h:'an insult', pairs:'a first day, unfamiliar room'},
{id:'x_quitPlanKeep', fam:'restart', name:'quit the plan', themes:['failure','change'], voice:'mix',
 k:'quit the plan', h:'keep the promise', pairs:'a torn map, a steady walk'},
{id:'x_pricedIt', fam:'cost', name:'you priced it', themes:['failure','money'], voice:'mix',
 k:'you did not waste it', h:'you priced it', pairs:'a receipt, a closed shop'},
/* family */
{id:'x_lastOrdinary', fam:'kin', name:'the last ordinary day', themes:['family','mortality'], voice:'mix',
 k:'the last ordinary day', h:'never announces itself', pairs:'a kitchen, warm evening light'},
{id:'x_sitLonger', fam:'kin', name:'sit with them longer', themes:['family','love'], voice:'mix',
 k:'sit with them longer', h:'than is comfortable', pairs:'two chairs, a slow evening'},
{id:'x_missTheNoise', fam:'kin', name:'you will miss the noise', themes:['family','regret'], voice:'mix',
 k:'one day', h:'you will miss the noise', pairs:'a loud full kitchen'},
{id:'x_proudBadly', fam:'kin', name:'they say it badly', themes:['family','love'], voice:'mix',
 k:'they are proud', h:'they just say it badly', pairs:'an older face, half a smile'},
/* joy */
{id:'x_goodAlsoTrue', fam:'joy', name:'good things are also true', themes:['joy','healing'], voice:'mix',
 k:'good things', h:'are also true', pairs:'ordinary sunlight, a plain street'},
{id:'x_softLife', fam:'joy', name:'a soft life is allowed', themes:['joy','rest'], voice:'mix',
 k:'a soft life', h:'is allowed', pairs:'linen, morning light, stillness'},
{id:'x_laughLouder', fam:'joy', name:'laugh louder', themes:['joy','authentic'], voice:'mix',
 k:'laugh louder', h:'it costs nothing', pairs:'an unposed laughing face'},
{id:'x_boringPrize', fam:'joy', name:'the boring safe day', themes:['joy','gratitude'], voice:'mix',
 k:'the boring safe day', h:'was the prize', pairs:'an unremarkable warm afternoon'},
/* love */
{id:'x_attentionLove', fam:'bond', name:'attention is love', themes:['love','family'], voice:'mix',
 k:'attention', h:'is the whole of love', pairs:'two people, one listening'},
{id:'x_reliableRomantic', fam:'bond', name:'reliable is romantic', themes:['love','discipline'], voice:'mix',
 k:'reliable', h:'is romantic', pairs:'an ordinary shared morning'},
{id:'x_pickCalm', fam:'bond', name:'pick the calm one', themes:['love','rest'], voice:'mix',
 k:'pick the calm one', h:'every time', pairs:'still water, a quiet room'},
{id:'x_sayKind', fam:'bond', name:'say the kind thing', themes:['love','regret'], voice:'mix',
 k:'say the kind thing', h:'out loud', pairs:'two faces, close, warm light'},
/* gratitude */
{id:'x_oldDaysLater', fam:'joy', name:'these are the old days', themes:['gratitude','time'], voice:'mix',
 k:'these are', h:'the old days later', pairs:'an ordinary evening, film grain'},
{id:'x_insideAnswer', fam:'joy', name:'inside the answered prayer', themes:['gratitude','joy'], voice:'mix',
 k:'you are inside', h:'the answered prayer', pairs:'a modest home, warm light'},
{id:'x_countStayed', fam:'acceptance', name:'count what stayed', themes:['gratitude','healing'], voice:'mix',
 k:'count what stayed', h:'not what left', pairs:'a full table, some empty chairs'},
{id:'x_haveEnough', fam:'envy', name:'you have enough', themes:['gratitude','envy'], voice:'mix',
 k:'you had enough', h:'until you opened the app', pairs:'a phone glow over a real room'},
/* envy */
{id:'x_resultNotRoutine', fam:'envy', name:'the result not the routine', themes:['envy','discipline'], voice:'mix',
 k:'you want the result', h:'not the routine', pairs:'a trophy, an empty gym'},
{id:'x_theyStarted', fam:'envy', name:'they started', themes:['envy','fear'], voice:'mix',
 k:'they started', h:'that is the whole gap', pairs:'a starting line, one runner gone'},
{id:'x_laneEmpty', fam:'self', name:'your lane is empty', themes:['envy','authentic'], voice:'mix',
 k:'your lane is empty', h:'for a reason', pairs:'an empty road beside a busy one'},
{id:'x_stopAuditioning', fam:'silence', name:'stop auditioning', themes:['envy','worth'], voice:'mix',
 k:'stop auditioning', h:'for their approval', pairs:'an empty stage, a lit exit'},
/* regret */
{id:'x_safeChoice', fam:'acceptance', name:'you will not remember the safe choice', themes:['regret','fear'], voice:'mix',
 k:'you will not remember', h:'the safe choice', pairs:'a fork in a road at dusk'},
{id:'x_doorSeason', fam:'urgency', name:'the door was open for a season', themes:['regret','time'], voice:'mix',
 k:'the door was open', h:'for a season', pairs:'a door closing, low light'},
{id:'x_beforeStory', fam:'urgency', name:'before it becomes a story', themes:['regret','change'], voice:'mix',
 k:'do it before', h:'it becomes a story', pairs:'a departing train'},
{id:'x_regretHeavier', fam:'comparative', name:'regret is heavier', themes:['regret','discipline'], voice:'mix',
 k:'regret is heavier', h:'than effort', pairs:'a carried weight, a bowed back'},
/* rest */
{id:'x_outworkSleep', fam:'rest', name:'you cannot outwork no sleep', themes:['rest','health'], voice:'mix',
 k:'you cannot outwork', h:'no sleep', pairs:'a desk lamp at 3am'},
{id:'x_breakIsRep', fam:'rest', name:'the break is part of the rep', themes:['rest','work'], voice:'mix',
 k:'the break', h:'is part of the rep', pairs:'a bench, a towel, a still gym'},
{id:'x_earnRest', fam:'rest', name:'stop earning rest', themes:['rest','worth'], voice:'mix',
 k:'stop earning', h:'your right to rest', pairs:'an unmade bed, morning'},
{id:'x_tiredData', fam:'rest', name:'tired is data', themes:['rest','healing'], voice:'mix',
 k:'tired is data', h:'not weakness', pairs:'a slumped figure, low light'},
/* worth */
{id:'x_notChosen', fam:'worth', name:'you do not need to be chosen', themes:['worth','solitude'], voice:'mix',
 k:'you do not need', h:'to be chosen', pairs:'one figure, wide empty frame'},
{id:'x_stopBidding', fam:'worth', name:'stop bidding on people', themes:['worth','love'], voice:'mix',
 k:'stop bidding', h:'on people', pairs:'an auction room, a turned back'},
{id:'x_notDiscount', fam:'worth', name:'you are not a discount', themes:['worth','ego'], voice:'mix',
 k:'you are not', h:'a discount', pairs:'a price tag, cold light'},
{id:'x_raisePrice', fam:'standard', name:'raise the price of your time', themes:['worth','money'], voice:'mix',
 k:'raise the price', h:'of your time', pairs:'a clock, a closed calendar'},
/* health */
{id:'x_meetBody', fam:'body', name:'you meet your body later', themes:['health','mortality'], voice:'mix',
 k:'you will meet your body', h:'again at fifty', pairs:'a spine, hands, honest light'},
{id:'x_justWalk', fam:'body', name:'walk', themes:['health','rest'], voice:'mix',
 k:'walk', h:'it fixes more than you think', pairs:'a long path, early light'},
{id:'x_eatLikeHere', fam:'body', name:'eat like you want to be here', themes:['health','time'], voice:'mix',
 k:'eat like you', h:'want to be here', pairs:'a plain honest meal'},
{id:'x_painCheaper', fam:'body', name:'the pain now is cheaper', themes:['health','discipline'], voice:'mix',
 k:'the pain now', h:'is the cheaper one', pairs:'a gym against a clinic corridor'},
/* change */
{id:'x_changeMind', fam:'restart', name:'changing your mind', themes:['change','identity'], voice:'mix',
 k:'changing your mind', h:'is not losing', pairs:'a turned corner, new street'},
{id:'x_planDies', fam:'restart', name:'the plan can die', themes:['change','failure'], voice:'mix',
 k:'the plan can die', h:'you cannot', pairs:'a burnt page, a steady figure'},
{id:'x_leaveBefore', fam:'restart', name:'leave before you are bitter', themes:['change','regret'], voice:'mix',
 k:'leave before', h:'you get bitter', pairs:'a packed bag, an open door'},
{id:'x_keepDirection', fam:'restart', name:'keep the direction', themes:['change','purpose'], voice:'mix',
 k:'burn the timeline', h:'keep the direction', pairs:'a compass, a long horizon'},
/* purpose */
{id:'x_noApplause', fam:'purpose', name:'the work no one applauds', themes:['purpose','work'], voice:'mix',
 k:'do the work', h:'no one applauds', pairs:'a lone worker, dim light'},
{id:'x_meaningBuilt', fam:'purpose', name:'meaning is built', themes:['purpose','change'], voice:'mix',
 k:'meaning is built', h:'not found', pairs:'a half-finished structure'},
{id:'x_smallUseful', fam:'purpose', name:'small and useful', themes:['purpose','work'], voice:'mix',
 k:'small and useful', h:'beats big and vague', pairs:'one finished object'},
{id:'x_serveSomeone', fam:'purpose', name:'serve someone', themes:['purpose','love'], voice:'mix',
 k:'serve someone', h:'the rest follows', pairs:'hands giving something over'},
/* authentic */
{id:'x_cringeToll', fam:'self', name:'cringe is the toll', themes:['authentic','fear'], voice:'mix',
 k:'cringe is', h:'the toll for trying', pairs:'someone visibly trying, unpolished'},
{id:'x_legibleSelf', fam:'self', name:'legible to yourself first', themes:['authentic','identity'], voice:'mix',
 k:'be legible', h:'to yourself first', pairs:'a mirror, a handwritten page'},
{id:'x_weirdSignature', fam:'self', name:'your weird is your signature', themes:['authentic','purpose'], voice:'mix',
 k:'your weird', h:'is your signature', pairs:'an odd personal object'},
{id:'x_noOneWatching', fam:'self', name:'no one is watching that closely', themes:['authentic','ego'], voice:'mix',
 k:'no one is watching', h:'as closely as you fear', pairs:'a crowd, all facing away'},
/* friendship */
{id:'x_askTwice', fam:'circle', name:'ask twice', themes:['friendship','healing'], voice:'mix',
 k:'ask twice', h:'people lie the first time', pairs:'two people, one looking away'},
{id:'x_showUpDull', fam:'bond', name:'show up dull', themes:['friendship','discipline'], voice:'mix',
 k:'show up on the dull days', h:'that is the job', pairs:'an ordinary shared evening'},
{id:'x_friendWhoTells', fam:'circle', name:'the friend who tells you', themes:['friendship','worth'], voice:'mix',
 k:'the friend who tells you', h:'is the friend', pairs:'two faces, an honest conversation'},
{id:'x_plansNotPromises', fam:'circle', name:'make plans not promises', themes:['friendship','time'], voice:'mix',
 k:'make plans', h:'not promises', pairs:'a calendar, two names'}
];

PATTERNS.push.apply(PATTERNS, SWEEP);

/* ---- kindness ----
   The counterweight to the whole discipline canon, and the one that travels
   furthest because it asks nothing of the reader. Works hardest against a hard
   subject: the gentleness reads as strength precisely because the face does not. */
const KINDNESS = [
{id:'k_costsNothing', fam:'kindness', name:'be kind, it costs nothing', themes:['kindness','joy'], voice:'mix',
 k:'be kind', h:'it costs nothing', pairs:'a rough hand doing something gentle'},
{id:'k_gentleNotWeak', fam:'kindness', name:'gentle is not weak', themes:['kindness','worth'], voice:'mix',
 k:'gentle is not', h:'the same as weak', pairs:'a heavy build, an open palm'},
{id:'k_carrying', fam:'kindness', name:'everyone is carrying something', themes:['kindness','healing'], voice:'mix',
 k:'everyone is', h:'carrying something', pairs:'a crowded street, ordinary faces'},
{id:'k_strongestGentlest', fam:'kindness', name:'the strongest are the gentlest', themes:['kindness','ego'], voice:'mix',
 k:'the strongest people', h:'are the gentlest ones', pairs:'a boxer holding something small'},
{id:'k_whatItCost', fam:'kindness', name:'what today cost them', themes:['kindness','friendship'], voice:'mix',
 k:'you never know', h:'what today cost them', pairs:'a composed face on a tired body'},
{id:'k_volumeDown', fam:'kindness', name:'strength with the volume down', themes:['kindness','ego'], voice:'mix',
 k:'kindness is strength', h:'with the volume down', pairs:'a silent gesture, dim warm light'},
{id:'k_holdDoor', fam:'kindness', name:'hold the door', themes:['kindness','joy'], voice:'mix',
 k:'hold the door', h:'it lands heavier than you think', pairs:'a doorway, two strangers'},
{id:'k_wholeDay', fam:'kindness', name:'somebody whole day', themes:['kindness','gratitude'], voice:'mix',
 k:'your small kindness', h:'was somebody whole day', pairs:'a brief exchange, warm street light'},
{id:'k_beGentle', fam:'kindness', name:'be gentle, everyone is tired', themes:['kindness','rest'], voice:'mix',
 k:'be gentle', h:'everyone is tired', pairs:'a late bus, tired passengers'},
{id:'k_notClever', fam:'kindness', name:'no one remembers clever', themes:['kindness','ego'], voice:'mix',
 k:'nobody remembers', h:'how clever you were', pairs:'an empty meeting room'},
{id:'k_noReceipt', fam:'kindness', name:'give without the receipt', themes:['kindness','ego'], voice:'mix',
 k:'give it', h:'without the receipt', pairs:'a hand giving something over, unseen'},
{id:'k_travels', fam:'kindness', name:'kindness travels', themes:['kindness','purpose'], voice:'mix',
 k:'kindness travels', h:'further than you see it', pairs:'a long street, a small gesture'},
{id:'k_hardSoft', fam:'kindness', name:'hard life, soft heart', themes:['kindness','healing'], voice:'mix',
 k:'hard life', h:'soft heart anyway', pairs:'a weathered face, gentle eyes'},
{id:'k_stepGently', fam:'kindness', name:'step gently on the way up', themes:['kindness','work'], voice:'mix',
 k:'step gently', h:'on the way up', pairs:'a staircase, a helping hand'},
{id:'k_compounds', fam:'kindness', name:'small kindness compounds', themes:['kindness','time'], voice:'mix',
 k:'small kindness', h:'compounds quietly', pairs:'a plant growing in a crack'},
{id:'k_easyDay', fam:'kindness', name:'be someone easy day', themes:['kindness','love'], voice:'mix',
 k:'be the easy part', h:'of somebody hard day', pairs:'two people, one visibly relieved'}
];

PATTERNS.push.apply(PATTERNS, KINDNESS);

/* ---- the one who carries it ----
   Written for the masked-hero archetype and, more generally, for anyone in
   frame who is holding something the other person cannot see. Two-handers need
   lines about the gap between being needed and being known — the generic
   friendship pool is about maintaining adult friendships and does not fit. */
const MASK = [
{id:'msk_nameNotWeight', fam:'mask', name:'they know the name', themes:['identity','love'], voice:'mix',
 k:'they know your name', h:'not the weight', pairs:'two people close, one looking past the other'},
{id:'msk_soTheyDont', fam:'mask', name:'you carry it so they do not', themes:['love','worth'], voice:'mix',
 k:'you carry it', h:'so they do not have to', pairs:'one figure braced, another unaware'},
{id:'msk_notDisguise', fam:'mask', name:'the mask is not the disguise', themes:['identity','authentic'], voice:'mix',
 k:'the mask', h:'is not the disguise', pairs:'a reflection, a half-removed mask'},
{id:'msk_exceptYourself', fam:'mask', name:'saving everyone except yourself', themes:['worth','solitude'], voice:'mix',
 k:'you save everyone', h:'except the one asking', pairs:'a hero figure alone after the fact'},
{id:'msk_nobodySees', fam:'mask', name:'nobody sees you arrive', themes:['ego','solitude'], voice:'mix',
 k:'you always show up', h:'nobody sees you arrive', pairs:'a rooftop, a figure leaving frame'},
{id:'msk_twoLives', fam:'mask', name:'loved in one life', themes:['identity','love'], voice:'mix',
 k:'loved in one life', h:'unknown in the other', pairs:'a face split by light and shadow'},
{id:'msk_fromKnowing', fam:'mask', name:'protecting them from knowing', themes:['love','fear'], voice:'mix',
 k:'you protect them', h:'from knowing', pairs:'two people, one turned slightly away'},
{id:'msk_whoChecks', fam:'mask', name:'who checks on the helper', themes:['worth','friendship'], voice:'mix',
 k:'who checks on the one', h:'who saves everybody', pairs:'a lone figure after the crowd has gone'},
{id:'msk_gotHome', fam:'mask', name:'they got home because of you', themes:['love','purpose'], voice:'mix',
 k:'they got home', h:'you never said why', pairs:'a lit window seen from the street'},
{id:'msk_neededKnown', fam:'mask', name:'needed is not known', themes:['worth','solitude'], voice:'mix',
 k:'being needed', h:'is not being known', pairs:'a crowd reaching, one face unseen'},
{id:'msk_stillAKid', fam:'mask', name:'the kid under it', themes:['fear','identity'], voice:'mix',
 k:'the kid under it', h:'is still a kid', pairs:'a young face, too much weight in the eyes'},
{id:'msk_safeAndFar', fam:'mask', name:'safe and far away', themes:['love','regret'], voice:'mix',
 k:'you kept them safe', h:'and far away', pairs:'two figures with distance between them'},
{id:'msk_onlyPassenger', fam:'mask', name:'the city is full', themes:['love','solitude'], voice:'mix',
 k:'the city is full', h:'and you are still the only passenger', pairs:'a lit tunnel, a road blurring past two people'},
{id:'msk_quietNotGone', fam:'mask', name:'quiet not gone', themes:['love','solitude'], voice:'mix',
 k:'you found the one person', h:'who makes the loneliness quiet, not gone', pairs:'two people held close, eyes closed, night outside'},
{id:'msk_strangerHolding', fam:'mask', name:'everyone is a stranger', themes:['love','solitude'], voice:'mix',
 k:'everyone is a stranger', h:'except the one holding on', pairs:'a crowd or a blur, one pair of hands locked together'},
{id:'msk_onlyStillThing', fam:'mask', name:'the only still thing', themes:['love','solitude'], voice:'mix',
 k:'the road keeps moving', h:'this is the only still thing in it', pairs:'motion blur outside a window, stillness inside it'}
];

PATTERNS.push.apply(PATTERNS, MASK);

/* ---- filling the thin themes ----
   health, failure, envy, family, gratitude, kindness, money and joy were all
   under twenty patterns, which made them weak as standalone filters. */
const LIB3 = [
/* health */
{id:'h1', fam:'body', name:'your knees remember', themes:['health','time'], voice:'mix',
 k:'your knees', h:'remember everything', pairs:'stairs, an older gait'},
{id:'h2', fam:'body', name:'sleep is the cheapest medicine', themes:['health','rest'], voice:'mix',
 k:'sleep is', h:'the cheapest medicine', pairs:'a dark bedroom, one window'},
{id:'h3', fam:'body', name:'you cannot buy the years back', themes:['health','mortality'], voice:'mix',
 k:'you cannot buy', h:'the years back', pairs:'an old photograph beside a mirror'},
{id:'h4', fam:'body', name:'strong now or fragile later', themes:['health','discipline'], voice:'mix',
 k:'strong now', h:'or fragile later', pairs:'a loaded bar, cold light'},
{id:'h5', fam:'body', name:'boring and it works', themes:['health','discipline'], voice:'mix',
 k:'drink the water', h:'boring and it works', pairs:'a plain glass, morning light'},
{id:'h6', fam:'body', name:'the visit you postpone', themes:['health','fear'], voice:'mix',
 k:'the appointment', h:'you keep postponing', pairs:'a waiting room, empty chairs'},
{id:'h7', fam:'body', name:'not a machine you rent', themes:['health','worth'], voice:'mix',
 k:'your body is not', h:'a machine you rent', pairs:'hands, a spine, honest light'},
{id:'h8', fam:'body', name:'sit less', themes:['health','time'], voice:'mix',
 k:'sit less', h:'live longer', pairs:'a chair, a long window'},
{id:'h9', fam:'body', name:'the stairs count', themes:['health','work'], voice:'mix',
 k:'the stairs', h:'count as training', pairs:'a stairwell, harsh light'},
{id:'h10', fam:'body', name:'twenty minutes beats zero', themes:['health','discipline'], voice:'mix',
 k:'twenty minutes', h:'beats zero', pairs:'a runner in poor weather'},
{id:'h11', fam:'body', name:'fuel or debt', themes:['health','money'], voice:'mix',
 k:'food is either', h:'fuel or debt', pairs:'a plain meal, a neon takeaway'},
{id:'h12', fam:'body', name:'one spine', themes:['health','mortality'], voice:'mix',
 k:'you get one spine', h:'handle it accordingly', pairs:'a back, a heavy load'},

/* failure */
{id:'f1', fam:'loss', name:'everyone lost first', themes:['failure','ego'], voice:'mix',
 k:'everyone lost', h:'before you knew them', pairs:'a lit stage, an empty rehearsal room'},
{id:'f2', fam:'loss', name:'the failure was the shortcut', themes:['failure','work'], voice:'mix',
 k:'the failure', h:'was the shortcut', pairs:'a broken prototype on a bench'},
{id:'f3', fam:'loss', name:'you got up', themes:['failure','discipline'], voice:'mix',
 k:'you got up', h:'that is the whole record', pairs:'a fighter rising, hard light'},
{id:'f4', fam:'loss', name:'nobody watched you fall', themes:['failure','ego'], voice:'mix',
 k:'nobody watched', h:'you fall', pairs:'an empty street, one figure'},
{id:'f5', fam:'loss', name:'the second attempt', themes:['failure','authentic'], voice:'mix',
 k:'the second attempt', h:'is the honest one', pairs:'a reworked page, a lit desk'},
{id:'f6', fam:'loss', name:'you started anyway', themes:['failure','fear'], voice:'mix',
 k:'you were not ready', h:'you started anyway', pairs:'a first day, unfamiliar room'},
{id:'f7', fam:'loss', name:'a bad chapter', themes:['failure','healing'], voice:'mix',
 k:'a bad chapter', h:'is not a bad book', pairs:'an open book, low lamp'},
{id:'f8', fam:'loss', name:'you missed because you aimed', themes:['failure','purpose'], voice:'mix',
 k:'you missed', h:'because you aimed', pairs:'a target, a lone thrower'},
{id:'f9', fam:'loss', name:'wrong turn, still a mile', themes:['failure','change'], voice:'mix',
 k:'a wrong turn', h:'is still a mile walked', pairs:'a road forking in fog'},
{id:'f10', fam:'loss', name:'failed publicly, learned privately', themes:['failure','ego'], voice:'mix',
 k:'you failed loudly', h:'you learned quietly', pairs:'an empty auditorium'},
{id:'f11', fam:'loss', name:'try again tired', themes:['failure','discipline'], voice:'mix',
 k:'try again tired', h:'that is the skill', pairs:'a worn body, dim gym'},
{id:'f12', fam:'loss', name:'the drop taught the height', themes:['failure','healing'], voice:'mix',
 k:'the drop', h:'taught you the height', pairs:'a cliff edge, a wide sky'},

/* envy */
{id:'e1', fam:'envy', name:'the trophy not the training', themes:['envy','work'], voice:'mix',
 k:'you see the trophy', h:'never the training', pairs:'a lit cabinet, a dark gym'},
{id:'e2', fam:'envy', name:'a compass you misread', themes:['envy','purpose'], voice:'mix',
 k:'envy is a compass', h:'you keep misreading', pairs:'a compass, a divided road'},
{id:'e3', fam:'envy', name:'their timeline is not a deadline', themes:['envy','time'], voice:'mix',
 k:'their timeline', h:'is not your deadline', pairs:'two clocks showing different times'},
{id:'e4', fam:'envy', name:'not late, elsewhere', themes:['envy','purpose'], voice:'mix',
 k:'you are not late', h:'you are elsewhere', pairs:'a different road, same sunrise'},
{id:'e5', fam:'envy', name:'their ruler', themes:['envy','worth'], voice:'mix',
 k:'stop measuring', h:'with their ruler', pairs:'a measuring tape, a plain wall'},
{id:'e6', fam:'envy', name:'their win costs you nothing', themes:['envy','friendship'], voice:'mix',
 k:'their win', h:'costs you nothing', pairs:'a podium, a watching crowd'},
{id:'e7', fam:'envy', name:'watching is unpaid work', themes:['envy','attention'], voice:'mix',
 k:'watching them', h:'is unpaid work', pairs:'a face lit by a scrolling screen'},
{id:'e8', fam:'envy', name:'the same feed', themes:['envy','attention'], voice:'mix',
 k:'the same feed', h:'makes everyone feel behind', pairs:'many faces, many screens'},
{id:'e9', fam:'envy', name:'the outcome not the day', themes:['envy','discipline'], voice:'mix',
 k:'you envy the outcome', h:'not their actual day', pairs:'a glamour shot beside a grind shot'},
{id:'e10', fam:'envy', name:'different race', themes:['envy','identity'], voice:'mix',
 k:'different race', h:'no finish line', pairs:'two runners, separate roads'},
{id:'e11', fam:'envy', name:'close the app', themes:['envy','change'], voice:'mix',
 k:'close the app', h:'open the door', pairs:'a phone down, a door opening'},
{id:'e12', fam:'envy', name:'they compare upward too', themes:['envy','healing'], voice:'mix',
 k:'they are also', h:'comparing upward', pairs:'a mirror facing a mirror'},

/* family */
{id:'k1', fam:'kin', name:'the seat at their table', themes:['family','mortality'], voice:'mix',
 k:'the seat at their table', h:'will not always be there', pairs:'a set table, one chair empty'},
{id:'k2', fam:'kin', name:'four minutes', themes:['family','time'], voice:'mix',
 k:'answer the call', h:'it takes four minutes', pairs:'a ringing phone, a warm room'},
{id:'k3', fam:'kin', name:'they only want the update', themes:['family','love'], voice:'mix',
 k:'they do not want much', h:'they want the update', pairs:'an older face waiting'},
{id:'k4', fam:'kin', name:'your childhood home', themes:['family','regret'], voice:'mix',
 k:'your childhood home', h:'is running a countdown', pairs:'a familiar street, evening'},
{id:'k5', fam:'kin', name:'a language you outgrew', themes:['family','healing'], voice:'mix',
 k:'they worry', h:'in a language you outgrew', pairs:'two generations at one table'},
{id:'k6', fam:'kin', name:'visit before you cannot', themes:['family','mortality'], voice:'mix',
 k:'visit unannounced', h:'while that is possible', pairs:'a doorway, a surprised face'},
{id:'k7', fam:'kin', name:'love, badly typed', themes:['family','love'], voice:'mix',
 k:'the family group chat', h:'is love, badly typed', pairs:'a phone screen, warm kitchen'},
{id:'k8', fam:'kin', name:'more than the face', themes:['family','identity'], voice:'mix',
 k:'you inherited', h:'more than the face', pairs:'two profiles, same jawline'},
{id:'k9', fam:'kin', name:'while they hear it', themes:['family','gratitude'], voice:'mix',
 k:'say thank you', h:'while they can hear it', pairs:'an older ear, a close face'},
{id:'k10', fam:'kin', name:'the empty chair arrives', themes:['family','mortality'], voice:'mix',
 k:'the empty chair', h:'arrives without warning', pairs:'a family table, one gap'},
{id:'k11', fam:'kin', name:'they want the voice', themes:['family','love'], voice:'mix',
 k:'call, do not text', h:'they want the voice', pairs:'a phone held to an ear'},
{id:'k12', fam:'kin', name:'somebody whole plan', themes:['family','worth'], voice:'mix',
 k:'you were somebody', h:'entire plan', pairs:'a baby photo on a fridge'},

/* gratitude */
{id:'g1', fam:'acceptance', name:'the person past you needed', themes:['gratitude','identity'], voice:'mix',
 k:'you became', h:'who past you needed', pairs:'a mirror, a steady face'},
{id:'g2', fam:'acceptance', name:'you built some of this', themes:['gratitude','work'], voice:'mix',
 k:'look around', h:'you built some of this', pairs:'a modest room, personal objects'},
{id:'g3', fam:'acceptance', name:'the roof is not nothing', themes:['gratitude','money'], voice:'mix',
 k:'the roof', h:'is not nothing', pairs:'a plain ceiling, warm lamp'},
{id:'g4', fam:'acceptance', name:'you woke up', themes:['gratitude','mortality'], voice:'mix',
 k:'you woke up', h:'start there', pairs:'first light through a window'},
{id:'g5', fam:'acceptance', name:'the day you rushed', themes:['gratitude','envy'], voice:'mix',
 k:'someone envies', h:'the day you rushed', pairs:'an ordinary busy morning'},
{id:'g6', fam:'acceptance', name:'nothing missing except attention', themes:['gratitude','attention'], voice:'mix',
 k:'nothing is missing', h:'except your attention', pairs:'a full room, a distracted face'},
{id:'g7', fam:'acceptance', name:'thank the boring', themes:['gratitude','rest'], voice:'mix',
 k:'thank the boring years', h:'they kept you', pairs:'a quiet street, ordinary weather'},
{id:'g8', fam:'acceptance', name:'half of this you wanted', themes:['gratitude','joy'], voice:'mix',
 k:'half of this', h:'you once prayed for', pairs:'a modest home, evening light'},
{id:'g9', fam:'acceptance', name:'before it is a memory', themes:['gratitude','time'], voice:'mix',
 k:'notice this room', h:'before it is a memory', pairs:'an ordinary interior, film grain'},
{id:'g10', fam:'acceptance', name:'enough arrived', themes:['gratitude','purpose'], voice:'mix',
 k:'enough arrived', h:'you were busy', pairs:'a laid table nobody sat at'},

/* kindness */
{id:'n1', fam:'kindness', name:'better than you found them', themes:['kindness','purpose'], voice:'mix',
 k:'leave people', h:'better than you found them', pairs:'a parting handshake'},
{id:'n2', fam:'kindness', name:'the kind one is the strong one', themes:['kindness','worth'], voice:'mix',
 k:'the kind one', h:'is the strong one', pairs:'a large frame, a soft gesture'},
{id:'n3', fam:'kindness', name:'tip well, speak softer', themes:['kindness','money'], voice:'mix',
 k:'tip well', h:'speak softer', pairs:'a late diner, a tired server'},
{id:'n4', fam:'kindness', name:'assume the best', themes:['kindness','ego'], voice:'mix',
 k:'assume the best', h:'it costs you less', pairs:'two strangers, a shared doorway'},
{id:'n5', fam:'kindness', name:'be warm, the world is not', themes:['kindness','joy'], voice:'mix',
 k:'be warm', h:'the world is not', pairs:'a cold street, one lit window'},
{id:'n6', fam:'kindness', name:'no one regrets being gentle', themes:['kindness','regret'], voice:'mix',
 k:'no one regrets', h:'having been gentle', pairs:'an old face, calm eyes'},
{id:'n7', fam:'kindness', name:'your patience is relief', themes:['kindness','friendship'], voice:'mix',
 k:'your patience', h:'is somebody relief', pairs:'a queue, one calm face'},
{id:'n8', fam:'kindness', name:'small mercy, long memory', themes:['kindness','time'], voice:'mix',
 k:'small mercy', h:'long memory', pairs:'a hand offered in rain'},
{id:'n9', fam:'kindness', name:'hold your tongue', themes:['kindness','ego'], voice:'mix',
 k:'hold your tongue', h:'not your kindness', pairs:'a closed mouth, open hands'},
{id:'n10', fam:'kindness', name:'be kind to the tired', themes:['kindness','rest'], voice:'mix',
 k:'be kind to the tired', h:'that is everyone', pairs:'a late bus, heavy faces'},

/* money */
{id:'y1', fam:'cost', name:'save quietly', themes:['money','solitude'], voice:'mix',
 k:'save quietly', h:'it compounds louder', pairs:'a plain ledger, a lamp'},
{id:'y2', fam:'cost', name:'the rent does not care', themes:['money','work'], voice:'mix',
 k:'the rent', h:'does not care about talent', pairs:'an envelope on a doormat'},
{id:'y3', fam:'cost', name:'buy time not things', themes:['money','time'], voice:'mix',
 k:'buy time', h:'not things', pairs:'a clock beside a price tag'},
{id:'y4', fam:'cost', name:'one skill away', themes:['money','work'], voice:'mix',
 k:'you are one skill', h:'from a different year', pairs:'a lit desk, late study'},
{id:'y5', fam:'cost', name:'broke teaches, rich forgets', themes:['money','gratitude'], voice:'mix',
 k:'broke teaches', h:'rich forgets', pairs:'a cold flat beside a warm one'},
{id:'y6', fam:'cost', name:'expensive taste, cheap patience', themes:['money','comfort'], voice:'mix',
 k:'expensive taste', h:'cheap patience', pairs:'a luxury object, a credit slip'},
{id:'y7', fam:'cost', name:'options not character', themes:['money','worth'], voice:'mix',
 k:'money buys options', h:'never character', pairs:'a cold expensive interior'},
{id:'y8', fam:'cost', name:'the second income', themes:['money','change'], voice:'mix',
 k:'the second income', h:'is the first freedom', pairs:'a desk at night, two screens'},
{id:'y9', fam:'cost', name:'spend on the boring', themes:['money','discipline'], voice:'mix',
 k:'spend on the boring', h:'it pays you back', pairs:'insurance papers, a plain table'},
{id:'ch_proofNotBag', fam:'chase', name:'chasing proof not money', themes:['money','worth'], voice:'mix',
 k:'you are not chasing money', h:'you are chasing proof', pairs:'a hand full of cash, eyes fixed on someone off-frame'},
{id:'ch_closeGap', fam:'chase', name:'close the deal close the gap', themes:['money','worth'], voice:'mix',
 k:'close the deal', h:'close the gap in you', pairs:'a confident smile that does not reach the eyes'},
{id:'ch_hungerPlan', fam:'chase', name:'the hunger is the plan', themes:['money','purpose'], voice:'mix',
 k:'the hunger', h:'is the whole plan', pairs:'a figure leaning forward, restless hands on the desk'},
{id:'ch_wantedMatter', fam:'chase', name:'wanted to matter', themes:['money','worth'], voice:'mix',
 k:'you did not want the money', h:'you wanted to matter', pairs:'stacks of cash, a face checking who is watching'},
{id:'ch_keepCounting', fam:'chase', name:'keep counting', themes:['money','worth'], voice:'mix',
 k:'keep counting', h:'until counting stops mattering', pairs:'hands counting bills, no joy in the face'},
{id:'ch_bagDiscipline', fam:'chase', name:'the bag was never the point', themes:['money','discipline'], voice:'mix',
 k:'the bag', h:'was never the point, the discipline was', pairs:'money on a desk beside a plain wristwatch'},
{id:'ch_earnedLook', fam:'chase', name:'the look you earn', themes:['money','ego'], voice:'mix',
 k:'they clocked the watch', h:'not the year it took', pairs:'a close hand gesture with jewelry, confident stare'},
{id:'ch_stopAtZero', fam:'chase', name:'no number stops it', themes:['money','worth'], voice:'mix',
 k:'no number', h:'was ever going to be enough', pairs:'a hand holding cash up to the camera, a hungry grin'},
{id:'y10', fam:'cost', name:'small habits, big later', themes:['money','time'], voice:'mix',
 k:'small money habits', h:'large money later', pairs:'coins, a long horizon'},

/* joy */
{id:'j1', fam:'joy', name:'let it be good', themes:['joy','rest'], voice:'mix',
 k:'let it be good', h:'without waiting for proof', pairs:'warm light, an easy face'},
{id:'j2', fam:'joy', name:'the good day needs no reason', themes:['joy','gratitude'], voice:'mix',
 k:'a good day', h:'does not need a reason', pairs:'plain sunlight on a street'},
{id:'j3', fam:'joy', name:'dance badly', themes:['joy','authentic'], voice:'mix',
 k:'dance badly', h:'it still counts', pairs:'a blurred moving figure'},
{id:'j4', fam:'joy', name:'not behind, alive', themes:['joy','envy'], voice:'mix',
 k:'you are not behind', h:'you are alive', pairs:'an ordinary morning window'},
{id:'j5', fam:'joy', name:'make it fun or stop', themes:['joy','discipline'], voice:'mix',
 k:'make it fun', h:'or you will stop', pairs:'someone laughing mid-effort'},
{id:'j6', fam:'joy', name:'not a reward for suffering', themes:['joy','worth'], voice:'mix',
 k:'joy is not', h:'a reward for suffering', pairs:'soft light, an unearned rest'},
{id:'j7', fam:'joy', name:'the ordinary tuesday', themes:['joy','time'], voice:'mix',
 k:'the ordinary tuesday', h:'was the answer', pairs:'a plain midweek afternoon'},
{id:'j8', fam:'joy', name:'smile at strangers', themes:['joy','kindness'], voice:'mix',
 k:'smile at strangers', h:'cheap magic', pairs:'two passing faces, warm light'},
{id:'j9', fam:'joy', name:'every worst day so far', themes:['joy','healing'], voice:'mix',
 k:'you survived', h:'every worst day so far', pairs:'a steady face, soft light'},
{id:'j10', fam:'joy', name:'eat the cake', themes:['joy','comfort'], voice:'mix',
 k:'eat the cake', h:'it is a wednesday', pairs:'a plain kitchen, a small celebration'}
];

PATTERNS.push.apply(PATTERNS, LIB3);

/* ---- fourth sweep: smallest families and thinnest themes ----
   question, work and attention had under six patterns each — too few to
   filter on alone. regret, health, comfort and failure were still under
   thirty. Same compression rule as the rest of the mix voice. */
const LIB4 = [
/* more questions */
{id:'q1', fam:'question', name:'what are you optimising for', themes:['purpose','identity'], voice:'mix',
 k:'what are you actually', h:'optimising for', pairs:'a cluttered desk, a single lit screen'},
{id:'q2', fam:'question', name:'who is this impressing', themes:['ego','authentic'], voice:'mix',
 k:'who exactly', h:'is this impressing', pairs:'a mirror, an empty room'},
{id:'q3', fam:'question', name:'what would you do for free', themes:['purpose','joy'], voice:'mix',
 k:'what would you still do', h:'if nobody paid you', pairs:'a workshop, hands mid-task'},
{id:'q4', fam:'question', name:'whose voice is that', themes:['fear','identity'], voice:'mix',
 k:'is that your voice', h:'or someone else’s fear', pairs:'a mirror, a hesitant face'},
{id:'q5', fam:'question', name:'what are you rehearsing for', themes:['fear','change'], voice:'mix',
 k:'what disaster', h:'are you rehearsing for', pairs:'a sleepless face, blue light'},
{id:'q6', fam:'question', name:'when did comfortable start', themes:['comfort','change'], voice:'mix',
 k:'when did comfortable', h:'become the goal', pairs:'a sofa in blue TV light'},
{id:'q7', fam:'question', name:'what are you protecting', themes:['fear','worth'], voice:'mix',
 k:'is it pride', h:'or actually fear', pairs:'a closed door, arms folded'},
{id:'q8', fam:'question', name:'who would notice', themes:['solitude','worth'], voice:'mix',
 k:'if you stopped performing', h:'who would even notice', pairs:'a stage, an emptying room'},
{id:'q9', fam:'question', name:'what took its place', themes:['time','regret'], voice:'mix',
 k:'the dream did not die', h:'something replaced it', pairs:'a dusty guitar, a full inbox'},
{id:'q10', fam:'question', name:'what does easy cost later', themes:['comfort','regret'], voice:'mix',
 k:'what does easy', h:'cost you later', pairs:'a couch, a closed laptop'},

/* more work */
{id:'w1', fam:'work', name:'nobody claps for the setup', themes:['work','ego'], voice:'mix',
 k:'nobody claps', h:'for the setup', pairs:'an empty stage before the show'},
{id:'w2', fam:'work', name:'the craft outlives the trend', themes:['work','time'], voice:'mix',
 k:'trends fade', h:'craft does not', pairs:'worn tools on a workbench'},
{id:'w3', fam:'work', name:'ship it imperfect', themes:['work','fear'], voice:'mix',
 k:'ship it imperfect', h:'fix it in public', pairs:'a half-finished object, honest light'},
{id:'w4', fam:'work', name:'the drafts nobody sees', themes:['work','failure'], voice:'mix',
 k:'they see draft twelve', h:'never the first eleven', pairs:'a stack of crossed-out pages'},
{id:'w5', fam:'work', name:'discipline outperforms passion', themes:['work','discipline'], voice:'mix',
 k:'passion fades by noon', h:'discipline does not', pairs:'a clock, a lit workstation'},
{id:'w6', fam:'work', name:'nobody drowning looks calm', themes:['work','failure'], voice:'mix',
 k:'the calm ones', h:'are drowning quietly too', pairs:'a composed face under pressure'},
{id:'w7', fam:'work', name:'the reps you skip show', themes:['work','discipline'], voice:'mix',
 k:'the reps you skip', h:'always show eventually', pairs:'an empty gym, dawn light'},
{id:'w8', fam:'work', name:'good enough ships', themes:['work','worth'], voice:'mix',
 k:'perfect never ships', h:'good enough does', pairs:'a finished imperfect object'},
{id:'w9', fam:'work', name:'the ugly middle is normal', themes:['work','fear'], voice:'mix',
 k:'the ugly middle', h:'is a normal place to be', pairs:'a half-built structure, scaffolding'},
{id:'w10', fam:'work', name:'talent rents, work owns', themes:['work','identity'], voice:'mix',
 k:'talent rents the room', h:'work owns the building', pairs:'a workshop, personal tools'},

/* more attention */
{id:'a1', fam:'attention', name:'your focus is being auctioned', themes:['attention','money'], voice:'mix',
 k:'your focus', h:'is being auctioned', pairs:'a phone glow, a dark room'},
{id:'a2', fam:'attention', name:'boredom used to be normal', themes:['attention','rest'], voice:'mix',
 k:'boredom used to be', h:'a normal tuesday', pairs:'a quiet room, no screen'},
{id:'a3', fam:'attention', name:'the algorithm is not your friend', themes:['attention','envy'], voice:'mix',
 k:'the algorithm', h:'is not your friend', pairs:'a face lit blue, a scrolling thumb'},
{id:'a4', fam:'attention', name:'notifications are not emergencies', themes:['attention','rest'], voice:'mix',
 k:'a notification', h:'is not an emergency', pairs:'a buzzing phone, a still hand'},
{id:'a5', fam:'attention', name:'presence is the new luxury', themes:['attention','worth'], voice:'mix',
 k:'presence', h:'is the new luxury', pairs:'a face without a screen, warm light'},
{id:'a6', fam:'attention', name:'the feed has no bottom', themes:['attention','time'], voice:'mix',
 k:'the feed', h:'was built with no bottom', pairs:'an endless scroll, a tired thumb'},
{id:'a7', fam:'attention', name:'your gaze is a vote', themes:['attention','purpose'], voice:'mix',
 k:'where you look', h:'is where you vote', pairs:'a crossroads of screens and windows'},
{id:'a8', fam:'attention', name:'silence the noise you chose', themes:['attention','solitude'], voice:'mix',
 k:'mute the noise', h:'you keep choosing', pairs:'a phone on silent, an open window'},

/* regret, filled out */
{id:'r1', fam:'acceptance', name:'the apology you never sent', themes:['regret','love'], voice:'mix',
 k:'the apology', h:'you never sent', pairs:'an unfinished letter, low light'},
{id:'r2', fam:'acceptance', name:'you kept the ticket', themes:['regret','change'], voice:'mix',
 k:'you kept the ticket', h:'and never went back', pairs:'a drawer, an old stub'},
{id:'r3', fam:'acceptance', name:'the version of you who stayed', themes:['regret','identity'], voice:'mix',
 k:'somewhere', h:'the version who stayed is fine too', pairs:'a fork in an old road'},
{id:'r4', fam:'acceptance', name:'you cannot edit the past', themes:['regret','healing'], voice:'mix',
 k:'you cannot edit it', h:'only carry it lighter', pairs:'an open hand, soft light'},
{id:'r5', fam:'acceptance', name:'you did not know yet', themes:['regret','healing'], voice:'mix',
 k:'you did not know', h:'what you know now', pairs:'a younger photograph'},
{id:'r6', fam:'urgency', name:'the message you keep drafting', themes:['regret','love'], voice:'mix',
 k:'send the message', h:'you keep drafting', pairs:'a phone, an unsent text visible'},
{id:'r7', fam:'acceptance', name:'the fight was never worth it', themes:['regret','friendship'], voice:'mix',
 k:'the fight', h:'was never worth the silence', pairs:'two empty chairs facing away'},
{id:'r8', fam:'acceptance', name:'you left too much unsaid', themes:['regret','family'], voice:'mix',
 k:'you left too much', h:'unsaid at the door', pairs:'a doorway, a departing figure'},
{id:'r9', fam:'urgency', name:'apologise before pride wins', themes:['regret','ego'], voice:'mix',
 k:'say sorry first', h:'before your pride does', pairs:'two people, one turning back'},
{id:'r10', fam:'acceptance', name:'the year you cannot get back', themes:['regret','time'], voice:'mix',
 k:'that year', h:'is not coming back', pairs:'a calendar, a faded photograph'},

/* health, filled out */
{id:'he1', fam:'body', name:'tired is not the same as dying', themes:['health','rest'], voice:'mix',
 k:'tired is not', h:'the same as dying', pairs:'a resting figure, soft light'},
{id:'he2', fam:'body', name:'your future spine is watching', themes:['health','identity'], voice:'mix',
 k:'your future spine', h:'is watching this posture', pairs:'a hunched desk, harsh light'},
{id:'he3', fam:'body', name:'the checkup you keep pushing', themes:['health','fear'], voice:'mix',
 k:'the checkup you keep pushing', h:'will not push itself', pairs:'a calendar, a clinic sign'},
{id:'he4', fam:'body', name:'strength is borrowed time', themes:['health','gratitude'], voice:'mix',
 k:'strength', h:'is borrowed, not owned', pairs:'a lifted weight, honest light'},
{id:'he5', fam:'body', name:'the body keeps the receipts', themes:['health','discipline'], voice:'mix',
 k:'the body', h:'keeps every receipt', pairs:'hands, a mirror, honest light'},
{id:'he6', fam:'body', name:'rest is not the enemy of gains', themes:['health','rest'], voice:'mix',
 k:'rest', h:'is not the enemy of progress', pairs:'an empty gym, morning'},
{id:'he7', fam:'body', name:'water before coffee', themes:['health','discipline'], voice:'mix',
 k:'water before coffee', h:'small rule, real difference', pairs:'a plain glass, morning light'},
{id:'he8', fam:'body', name:'the mirror is not the whole truth', themes:['health','worth'], voice:'mix',
 k:'the mirror', h:'is not the whole truth', pairs:'a mirror, a steady gaze'},

/* comfort, filled out */
{id:'co1', fam:'reframe', name:'the algorithm of ease', themes:['comfort','attention'], voice:'mix',
 k:'ease is engineered', h:'to keep you still', pairs:'a soft chair, a glowing screen'},
{id:'co2', fam:'reframe', name:'convenience has a cost', themes:['comfort','money'], voice:'mix',
 k:'convenience', h:'always has a price tag', pairs:'a delivery box, a closed door'},
{id:'co3', fam:'reframe', name:'the safe choice ages badly', themes:['comfort','regret'], voice:'mix',
 k:'the safe choice', h:'ages the worst', pairs:'a familiar chair, dust settling'},
{id:'co4', fam:'reframe', name:'numb is not peace', themes:['comfort','healing'], voice:'mix',
 k:'numb', h:'is not the same as peace', pairs:'a still figure, flat light'},
{id:'co5', fam:'reframe', name:'the recliner has no finish line', themes:['comfort','purpose'], voice:'mix',
 k:'the recliner', h:'has no finish line', pairs:'a worn armchair, a dim room'},
{id:'co6', fam:'reframe', name:'familiar is not the same as right', themes:['comfort','authentic'], voice:'mix',
 k:'familiar', h:'is not the same as right', pairs:'a worn path, an unopened door'},

/* failure, filled out */
{id:'fa1', fam:'loss', name:'the reps you failed built this', themes:['failure','work'], voice:'mix',
 k:'every rep you failed', h:'built the one you landed', pairs:'a gym, a single clean lift'},
{id:'fa2', fam:'loss', name:'no one remembers your worst draft', themes:['failure','ego'], voice:'mix',
 k:'no one remembers', h:'your worst draft', pairs:'a bin full of crossed-out pages'},
{id:'fa3', fam:'loss', name:'the fall taught the landing', themes:['failure','healing'], voice:'mix',
 k:'the fall', h:'taught you the landing', pairs:'a skater rising, scraped hands'},
{id:'fa4', fam:'loss', name:'you are not the rejection', themes:['failure','worth'], voice:'mix',
 k:'you are not', h:'the rejection letter', pairs:'a closed envelope, a steady face'},
{id:'fa5', fam:'loss', name:'the graveyard of tries is a resume', themes:['failure','work'], voice:'mix',
 k:'that graveyard of tries', h:'is your real resume', pairs:'old notebooks, a cluttered shelf'}
];

PATTERNS.push.apply(PATTERNS, LIB4);

/* Sourced from five elevenstoic carousels (Sept 2026 check-in), rewritten in this
   engine's voice — kicker/headline split, profanity swapped for the same charge
   without the word, memes and app-promo slides left out. Short phrases like these
   circulate across the whole genre uncredited; nothing here is a named author's line. */
const IG5 = [
{id:'mock_richBroke', fam:'mock', name:'call a rich man broke', themes:['worth','ego'], voice:'mix',
 k:'call a rich man broke', h:'he will laugh', pairs:'a composed figure, unbothered, mid-gesture'},
{id:'mock_strongWeak', fam:'mock', name:'call a strong man weak', themes:['worth','ego'], voice:'mix',
 k:'call a strong man weak', h:'he will laugh', pairs:'an athlete mid-effort, no reaction to the insult'},
{id:'mock_geniusDumb', fam:'mock', name:'call a genius dumb', themes:['worth','ego'], voice:'mix',
 k:'call a genius dumb', h:'he will laugh', pairs:'a figure unbothered, looking past the camera'},
{id:'cf_empathyHurt', fam:'confession', name:'you preach empathy', themes:['kindness','authentic'], voice:'mix',
 k:'you preach empathy', h:'you have hurt people too', pairs:'a soft-lit face with a hard edge in the eyes'},
{id:'cf_growthRepeat', fam:'confession', name:'you preach growth', themes:['change','authentic'], voice:'mix',
 k:'you preach growth', h:'and repeat the same patterns', pairs:'a figure walking the same street twice'},
{id:'cf_healPast', fam:'confession', name:'you preach healing', themes:['healing','regret'], voice:'mix',
 k:'you preach healing', h:'and still live in the past', pairs:'a figure looking back over one shoulder'},
{id:'cf_positiveNeeds', fam:'confession', name:'you give the positive message', themes:['worth','authentic'], voice:'mix',
 k:'you give the positive message', h:'you are the one who needed it', pairs:'someone mid-speech, tired eyes'},
{id:'cf_joyMissing', fam:'confession', name:'you preach joy', themes:['joy','authentic'], voice:'mix',
 k:'you preach joy', h:'yours is missing it', pairs:'a smiling face, dim light around the eyes'},
{id:'cf_loveHurts', fam:'confession', name:'you preach love', themes:['love','regret'], voice:'mix',
 k:'you preach love', h:'and still carry the pain', pairs:'two people close, one hand pressed to the chest'},
{id:'cf_mindConsumes', fam:'confession', name:'you preach positivity', themes:['fear','authentic'], voice:'mix',
 k:'you preach positivity', h:'some days it all consumes you', pairs:'a face half-lit, half in shadow'},
{id:'cf_resentForgive', fam:'confession', name:'you preach letting go', themes:['regret','healing'], voice:'mix',
 k:'you preach letting go', h:'forgiveness is still hard', pairs:'two figures, one hand almost reaching the other'},
{id:'ig_offensiveTrue', fam:'social', name:'only offensive when true', themes:['ego','authentic'], voice:'mix',
 k:'it is only offensive', h:'when it is true', pairs:'a still, unflinching close-up'},
{id:'ig_criticismWork', fam:'identity', name:'criticism points to the work', themes:['identity','discipline'], voice:'mix',
 k:'the criticism that stings most', h:'points to what needs work most', pairs:'a tense face lit from one side'},
{id:'ig_unlearnHate', fam:'imperative', name:'unlearn the hate', themes:['ego','kindness'], voice:'mix',
 k:'unlearn the hate', h:'it is exhausting to carry', pairs:'a relaxed figure, shoulders finally down'},
{id:'ig_stepOutside', fam:'imperative', name:'step outside clear your mind', themes:['rest','healing'], voice:'mix',
 k:'step outside', h:'clear your mind', pairs:'an open door, light spilling in'},
{id:'ig_headsUp', fam:'reframe', name:'heads up better days', themes:['change','joy'], voice:'mix',
 k:'heads up', h:'better days are coming', pairs:'a figure looking up, first light on the face'},
{id:'ig_revengeDistance', fam:'imperative', name:'do distance not revenge', themes:['ego','solitude'], voice:'mix',
 k:'do not do revenge', h:'do distance', pairs:'a figure walking away, unhurried'},
{id:'ig_tooMuchLess', fam:'social', name:'too much go find less', themes:['worth','authentic'], voice:'mix',
 k:'if you are too much', h:'they can go find less', pairs:'a bold, unshrinking presence in frame'},
{id:'ig_seeYouWin', fam:'kin', name:'seeing you win too', themes:['friendship','love'], voice:'mix',
 k:'seeing you win', h:'is part of my dream too', pairs:'two figures, one cheering for the other'},
{id:'ig_bestDaysAhead', fam:'reframe', name:'best days not behind you', themes:['change','purpose'], voice:'mix',
 k:'your best days', h:'are not behind you', pairs:'a road ahead, headlights or sunrise'},
{id:'ig_enjoySmall', fam:'reframe', name:'enjoy the small things', themes:['gratitude','joy'], voice:'mix',
 k:'enjoy the', h:'small things', pairs:'an ordinary object made warm by light'},
{id:'ig_noTimeFake', fam:'social', name:'no time for fake people', themes:['friendship','worth'], voice:'mix',
 k:'no time', h:'for fake people', pairs:'a figure exiting a crowd, unbothered'},
{id:'ig_smileCounts', fam:'reframe', name:'smile today it counts', themes:['joy','gratitude'], voice:'mix',
 k:'smile today', h:'it counts', pairs:'a genuine, unposed half-smile'},
{id:'ig_bornToPlease', fam:'identity', name:'not born to please everybody', themes:['worth','ego'], voice:'mix',
 k:'you were not born', h:'to please everybody', pairs:'a composed figure, direct eye contact'},
{id:'ig_imagineFumbling', fam:'reframe', name:'imagine losing me', themes:['worth','ego'], voice:'mix',
 k:'imagine losing me', h:'condolences', pairs:'a confident half-turn away from camera'},
{id:'ig_forgiveNotNow', fam:'negation', name:'forgive and forget not this time', themes:['regret','ego'], voice:'mix',
 k:'forgive and forget?', h:'not this time', pairs:'a hard, closed expression'},
{id:'ig_notSecretBusiness', fam:'mask', name:'not a secret not your business', themes:['solitude','worth'], voice:'mix',
 k:'not a secret', h:'just not your business', pairs:'a composed figure giving nothing away'},
{id:'ig_idgafDangerous', fam:'reframe', name:'the level of not caring', themes:['ego','worth'], voice:'mix',
 k:'the level of not caring', h:'i am at now is dangerous', pairs:'a relaxed, almost amused expression'}
];
PATTERNS.push.apply(PATTERNS, IG5);

/* Second elevenstoic check-in (Sept 2026): every image across five more posts,
   filtered to posts confirmed over 10k likes (11.3K-36.6K). Same rules — kicker/
   headline split in this engine's voice, app-promo slides and exact-duplicate
   lines left out, one line rewritten to drop a religious reference since the
   rest of the library stays secular. */
const IG6 = [
{id:'ig2_untilDone', fam:'ig2', name:'until it is done tell none', themes:['discipline','solitude'], voice:'mix',
 k:'until it is done', h:'tell none', pairs:'a figure working alone, no audience in frame'},
{id:'ig2_soBack', fam:'ig2', name:'life update we are so back', themes:['change','joy'], voice:'mix',
 k:'life update', h:'we are so back', pairs:'a figure mid-laugh after a hard stretch'},
{id:'ig2_reactObserve', fam:'ig2', name:'react less observe more', themes:['discipline','ego'], voice:'mix',
 k:'react less', h:'observe more', pairs:'a still face, arms crossed, watching'},
{id:'ig2_chaseHer', fam:'ig2', name:'chase the dream like you chased her', themes:['purpose','ego'], voice:'mix',
 k:'chase the dream', h:'the way you chased her', pairs:'a figure grinning, holding up a bold statement'},
{id:'ig2_privilegeAgain', fam:'ig2', name:'privilege to try again and again', themes:['gratitude','discipline'], voice:'mix',
 k:'what a privilege it is', h:'to try again and again', pairs:'a worn notebook, morning light'},
{id:'ig2_stillHereLost', fam:'ig2', name:'still here whatever tried lost', themes:['worth','failure'], voice:'mix',
 k:'you are still here', h:'whatever tried to beat you lost', pairs:'a composed figure, unmarked by the fight'},
{id:'ig2_sixthYear', fam:'ig2', name:'five years nothing then the sixth', themes:['discipline','time'], voice:'mix',
 k:'five years of nothing', h:'then the sixth year happens', pairs:'a long empty road, one figure still walking it'},
{id:'ig2_delusionalBelief', fam:'ig2', name:'call it delusional call it belief', themes:['worth','purpose'], voice:'mix',
 k:'call it delusional', h:'i call it belief', pairs:'a direct, unbothered stare into the lens'},
{id:'ig2_pushMe', fam:'ig2', name:'push me the life we talk about', themes:['purpose','discipline'], voice:'mix',
 k:'push me', h:'i want the life we talk about', pairs:'a figure mid-stride, head down against the wind'},
{id:'ig2_beStay', fam:'ig2', name:'be you stay you', themes:['authentic','worth'], voice:'mix',
 k:'be you', h:'stay you', pairs:'a plain, unposed portrait'},
{id:'ig2_mainCharacter', fam:'ig2', name:'bad things happen to the main character too', themes:['identity','purpose'], voice:'mix',
 k:'bad things happen', h:'to the main character too', pairs:'a figure walking through a rough week, still upright'},
{id:'ig2_lessCareLive', fam:'ig2', name:'less you care more you live', themes:['ego','joy'], voice:'mix',
 k:'the less you care', h:'the more you live', pairs:'a relaxed figure, shoulders down, unbothered'},
{id:'ig2_brainAbs', fam:'ig2', name:'brain sexier than abs', themes:['worth','identity'], voice:'mix',
 k:'brain', h:'is sexier than abs', pairs:'a sharp, understated portrait, nothing performative'},
{id:'ig2_kidDreams', fam:'ig2', name:'still a kid with dreams', themes:['joy','purpose'], voice:'mix',
 k:'still a kid', h:'with dreams', pairs:'an adult face with a childlike grin'},
{id:'ig2_fakeWin', fam:'ig2', name:'losing fake people is a win', themes:['friendship','worth'], voice:'mix',
 k:'losing fake people', h:'is a win', pairs:'a figure walking away from a group, lighter'},
{id:'ig2_illusionTruth', fam:'ig2', name:'some enjoy the illusion you see the truth', themes:['authentic','ego'], voice:'mix',
 k:'some enjoy the illusion', h:'you got cursed with the truth', pairs:'one face turned away from a bright crowd'},
{id:'ig2_smallCircle', fam:'ig2', name:'no drama small circle', themes:['friendship','solitude'], voice:'mix',
 k:'no drama, no fake friends', h:'private life, small circle', pairs:'a small, tight group in a wide empty room'}
];
PATTERNS.push.apply(PATTERNS, IG6);

/* Third elevenstoic check-in: kept scrolling the grid, checking like counts
   before opening each post, only fully mining posts confirmed over 10k
   (21.1K and 57.6K here). Two lines seen along the way were dropped outright —
   one on-image attributed to J. Cole, one to a named fan account — since a name
   on the card makes it someone's line, not the genre's. */
const IG7 = [
{id:'ig3_weirdFeeling', fam:'ig3', name:'got a weird feeling we gonna be rich', themes:['money','purpose'], voice:'mix',
 k:'got a weird feeling', h:'we gonna be rich asf', pairs:'a confident grin, nothing to back it up yet but belief'},
{id:'ig3_lastYearBroke', fam:'ig3', name:'our last year being broke', themes:['money','change'], voice:'mix',
 k:'our last year', h:'being broke', pairs:'a plain room, a calendar, a quiet resolve'},
{id:'ig3_crazyGenius', fam:'ig3', name:'crazy until it works then genius', themes:['worth','purpose'], voice:'mix',
 k:'they call it crazy', h:'until it works, then it is genius', pairs:'a figure building something nobody else can see yet'},
{id:'ig3_shoutoutNewLife', fam:'ig3', name:'shoutout to the new life', themes:['change','discipline'], voice:'mix',
 k:'shoutout to the new life', h:'you said you would build', pairs:'a before-and-after in one frame, same person'},
{id:'ig3_fallBackRacks', fam:'ig3', name:'fall back get your money up', themes:['money','solitude'], voice:'mix',
 k:'fall back, get your money up', h:'distance, silence, peace', pairs:'a figure alone at a desk, city lights behind'},
{id:'ig3_happyMoney', fam:'ig3', name:'just tryna be happy and get money', themes:['joy','money'], voice:'mix',
 k:'just tryna be happy', h:'and get some money, that is all', pairs:'an unbothered figure, plain background'},
{id:'ig3_neverLuck', fam:'ig3', name:'never luck run it up again', themes:['worth','discipline'], voice:'mix',
 k:'show them it was never luck', h:'run it up more than once', pairs:'a repeated action, a second trophy in frame'},
{id:'ig3_hatedIdiots', fam:'ig3', name:'hated by idiots is the price', themes:['ego','worth'], voice:'mix',
 k:'being hated by idiots', h:'is the price for not being one', pairs:'a composed figure ignoring a loud crowd'},
{id:'ig3_criticismWrongPeople', fam:'ig3', name:'criticism from the wrong people is proof', themes:['identity','worth'], voice:'mix',
 k:'criticism from the wrong people', h:'is proof you are on the right path', pairs:'a figure walking forward, noise fading behind'},
{id:'ig3_sorryNotInterested', fam:'ig3', name:'sorry if i looked interested', themes:['ego','solitude'], voice:'mix',
 k:'sorry if i looked interested', h:'i am not', pairs:'a flat, unreadable expression'},
{id:'ig3_stopApproval', fam:'ig3', name:'stop seeking approval disapproval loses power', themes:['worth','authentic'], voice:'mix',
 k:'stop seeking approval', h:'and their disapproval loses power', pairs:'a figure walking away from a room full of opinions'},
{id:'ig3_stayRareCopies', fam:'ig3', name:'stay rare most are copies', themes:['authentic','identity'], voice:'mix',
 k:'stay rare', h:'most are just copies', pairs:'one distinct figure in a uniform crowd'},
{id:'ig3_winDefinitely', fam:'ig3', name:'i will win not immediately but definitely', themes:['discipline','purpose'], voice:'mix',
 k:'i will win', h:'not immediately, but definitely', pairs:'plain text, no face — the claim stands alone'}
];
PATTERNS.push.apply(PATTERNS, IG7);

/* A raw, anti-system register the library didn't have — Tyler Durden energy:
   reject the script, not just "stay disciplined." Same charge as a line like
   "fuck the system" without the word, since the whole library stays clean. */
const REBEL = [
{id:'rb_systemNotBuilt', fam:'rebel', name:'the system was never built for you', themes:['worth','authentic'], voice:'mix',
 k:'the system', h:'was never built for you', pairs:'a figure unbothered in a space built for someone else'},
{id:'rb_neverMeantFit', fam:'rebel', name:'never meant to fit', themes:['identity','ego'], voice:'mix',
 k:'you were never', h:'meant to fit', pairs:'a single figure out of step with a uniform crowd'},
{id:'rb_burnManual', fam:'rebel', name:'burn the manual', themes:['authentic','ego'], voice:'mix',
 k:'burn the manual', h:'they handed you', pairs:'a figure discarding something official-looking'},
{id:'rb_breakScript', fam:'rebel', name:'break the script before it breaks you', themes:['fear','authentic'], voice:'mix',
 k:'break the script', h:'before it breaks you', pairs:'a tense figure stepping out of a rehearsed pose'},
{id:'rb_rulesFear', fam:'rebel', name:'rules are fear with manners', themes:['ego','fear'], voice:'mix',
 k:'rules are just', h:'fear with good manners', pairs:'a calm face amid visibly nervous others'},
{id:'rb_stopAskingDangerous', fam:'rebel', name:'stop asking permission to be dangerous', themes:['worth','ego'], voice:'mix',
 k:'stop asking permission', h:'to be dangerous', pairs:'a direct, unflinching stare at the lens'},
{id:'rb_cageOpen', fam:'rebel', name:'the cage was open', themes:['fear','change'], voice:'mix',
 k:'the cage', h:'was open the whole time', pairs:'an open door or gap nobody else is using'},
{id:'rb_builtObeyed', fam:'rebel', name:'built to be obeyed', themes:['ego','authentic'], voice:'mix',
 k:'everything they built', h:'was built to be obeyed', pairs:'a figure standing apart from an ordered structure'}
];
PATTERNS.push.apply(PATTERNS, REBEL);

/* The genre's own voice, not just the "clean" version of it — bro, twin, lock
   in, no cap, and censored profanity used the way the real accounts use it:
   as a slap, not a slur. Same rule either way — it lands on the person's own
   excuses, never on another person. */
const GENZ = [
{id:'gz_momSoldier', fam:'genz', name:'mom raised a soldier not a bitch', themes:['family','worth'], voice:'mix',
 k:'mom raised a soldier', h:'not a b*tch', pairs:'a composed figure, unshaken, nothing performative'},
{id:'gz_lockInLoseYear', fam:'genz', name:'lock the fuck in or lose the year', themes:['discipline','purpose'], voice:'mix',
 k:'lock the f*ck in', h:'or lose the year', pairs:'a figure mid-effort, no audience, no excuses'},
{id:'gz_twinThisYear', fam:'genz', name:'twin this is the year', themes:['change','friendship'], voice:'mix',
 k:'twin, this is the year', h:'we stop making excuses', pairs:'two figures nodding at each other, resolved'},
{id:'gz_broNextYear', fam:'genz', name:'bro said next year again', themes:['ego','change'], voice:'mix',
 k:'bro really said', h:'"next year" again', pairs:'a figure caught mid-excuse, half-smiling'},
{id:'gz_noCapBusy', fam:'genz', name:'you were never that busy', themes:['worth','discipline'], voice:'mix',
 k:'you were never', h:'that busy', pairs:'a phone face-down, an unstarted task in frame'},
{id:'gz_notDeepBro', fam:'genz', name:'not deep bro you did not want it', themes:['worth','discipline'], voice:'mix',
 k:'it is not deep, bro', h:'you just did not want it', pairs:'a plain, unflinching close-up'},
{id:'gz_lockInLogOff', fam:'genz', name:'lock in or log off', themes:['discipline','attention'], voice:'mix',
 k:'lock in', h:'or log off', pairs:'a cluttered phone screen next to an untouched notebook'},
{id:'gz_realOnesLockIn', fam:'genz', name:'real ones lock in the rest post', themes:['authentic','ego'], voice:'mix',
 k:'real ones lock in', h:'the rest post about it', pairs:'one figure working while others film themselves'},
{id:'gz_stopSoftTwin', fam:'genz', name:'stop being soft the season is not', themes:['discipline','worth'], voice:'mix',
 k:'stop being soft', h:'the season is not', pairs:'a hardened, focused expression'},
{id:'gz_bitchBuiltDifferent', fam:'genz', name:'built different not built to beg', themes:['worth','ego'], voice:'mix',
 k:'built different', h:'not built to beg, b*tch', pairs:'a composed figure, unbothered by the room'},
{id:'gz_bigBroSmallResults', fam:'genz', name:'big bro energy small bro results', themes:['ego','worth'], voice:'mix',
 k:'big bro energy', h:'small bro results', pairs:'a confident pose next to an unfinished task'},
{id:'gz_gymNotLying', fam:'genz', name:'the gym is not lying to you', themes:['discipline','worth'], voice:'mix',
 k:'the gym is not lying to you', h:'your excuses are', pairs:'a plain, unglamorous training moment'},
{id:'gz_sixHoursPhone', fam:'genz', name:'she said busy screen time said six hours', themes:['worth','discipline'], voice:'mix',
 k:'she said busy', h:'screen time said six hours', pairs:'a phone face-up, a to-do list face-down'},
{id:'gz_dadQuitter', fam:'genz', name:'dad did not raise a quitter', themes:['family','discipline'], voice:'mix',
 k:'dad did not raise a quitter', h:'so quit acting like one', pairs:'a composed figure, jaw set, not backing down'},
{id:'gz_comfortScam', fam:'genz', name:'your comfort zone is a scam', themes:['comfort','worth'], voice:'mix',
 k:'your comfort zone', h:'is a scam', pairs:'a soft, safe room shot with a cold, flat light'},
{id:'gz_gradeCaresMood', fam:'genz', name:'the grind does not care about your mood', themes:['discipline','work'], voice:'mix',
 k:'twin, the grind', h:'does not care about your mood', pairs:'a tired figure showing up anyway'},
{id:'gz_actLikeBuilt', fam:'genz', name:'you said built different act like it', themes:['worth','ego'], voice:'mix',
 k:'you said built different', h:'so act like it', pairs:'a figure being tested, not just talking about it'},
{id:'gz_dontAnnounce', fam:'genz', name:'real ones do not announce it', themes:['authentic','discipline'], voice:'mix',
 k:'real ones do not announce it', h:'they just lock in', pairs:'one figure working quietly while others perform'},
{id:'gz_softWorld', fam:'genz', name:'stop being soft on yourself', themes:['discipline','worth'], voice:'mix',
 k:'stop being soft on yourself', h:'the world already is not', pairs:'a hardened, resolved expression'},
{id:'gz_planNotDelusion', fam:'genz', name:'stop calling it delusion call it the plan', themes:['worth','purpose'], voice:'mix',
 k:'stop calling it delusion', h:'call it the plan', pairs:'a figure quietly building toward something unstated'},
{id:'gz_lockSeasonOut', fam:'genz', name:'lock in now or the season locks you out', themes:['discipline','time'], voice:'mix',
 k:'lock in now', h:'or the season locks you out', pairs:'a figure moving with urgency, no hesitation'}
];
PATTERNS.push.apply(PATTERNS, GENZ);

PATTERNS.forEach(p => { if (!p.voice) p.voice = 'stoic'; });
const VOICES = ['stoic','mix','drive'];


/* ---- casting: subject -> concept ----
   The observation this is built on: a poster in this genre is a SUBJECT cast
   against a CONCEPT, and the pairing is the whole trick. Spider-Man carries
   friendship and loneliness because the character already means that; a
   gangster carries loyalty and discipline; a child carries what you have lost.
   The pixel analysis cannot see who is in the frame, so the subject is named
   here and it biases which themes get drawn. */
const SUBJECTS = [
{key:'spider-man', aliases:['spiderman','peter parker','spidey','superhero','hero','mask','masked'],
 themes:['identity','love','solitude','worth','friendship','failure'],
 note:'the kid under the mask carrying everyone else'},
{key:'batman', aliases:['dark knight','bruce wayne','vigilante','cape'],
 themes:['solitude','mortality','discipline','purpose','identity'],
 note:'discipline bought with everything else'},
{key:'joker', aliases:['villain','clown','antihero','anti-hero'],
 themes:['authentic','failure','ego','healing'],
 note:'the one who stopped performing normal'},
{key:'gangster', aliases:['mafia','mob','peaky','crime','don','cartel'],
 themes:['friendship','family','discipline','money','ego'],
 note:'loyalty, family and silence as a code'},
{key:'boxer', aliases:['fighter','mma','ufc','ring','punch'],
 themes:['discipline','failure','work','health'],
 note:'getting up is the entire message'},
{key:'athlete', aliases:['footballer','soccer','runner','sprinter','basketball','sport','training'],
 themes:['discipline','work','health','time'],
 note:'the unseen reps behind the seen result'},
{key:'monk', aliases:['statue','philosopher','marcus','stoic','temple','buddha'],
 themes:['solitude','mortality','purpose','rest'],
 note:'stillness as the achievement'},
{key:'soldier', aliases:['military','army','war','veteran','uniform'],
 themes:['discipline','family','mortality','fear'],
 note:'duty, and what it costs at home'},
{key:'cowboy', aliases:['rider','western','horse','outlaw'],
 themes:['solitude','authentic','change'],
 note:'leaving without an explanation'},
{key:'king', aliases:['crown','throne','emperor','royal'],
 themes:['ego','worth','purpose'],
 note:'the weight of the thing you wanted'},
{key:'wolf', aliases:['lion','tiger','animal','predator','eagle'],
 themes:['solitude','authentic','discipline'],
 note:'alone by design, not by accident'},
{key:'child', aliases:['kid','boy','girl','young','childhood'],
 themes:['joy','gratitude','family','regret'],
 note:'who you were before you started performing'},
{key:'elder', aliases:['old man','old woman','grandfather','grandmother','aging','wrinkles'],
 themes:['mortality','regret','family','time'],
 note:'the arithmetic of remaining time'},
{key:'couple', aliases:['lovers','romance','wedding','holding hands','kiss'],
 themes:['love','friendship','regret'],
 note:'choosing someone on the dull days'},
{key:'businessman', aliases:['suit','office','ceo','corporate','tie','boardroom'],
 themes:['money','work','purpose','ego'],
 note:'the cost of the thing you are buying'},
{key:'driver', aliases:['car','night drive','highway','motorcycle','taxi'],
 themes:['solitude','change','time'],
 note:'moving without arriving'},
{key:'musician', aliases:['artist','guitar','studio','singer','painter'],
 themes:['authentic','purpose','work'],
 note:'taste as the only real moat'},
{key:'rain', aliases:['window','storm','wet street','umbrella'],
 themes:['healing','regret','rest'],
 note:'the pause that is not laziness'},
{key:'gym', aliases:['weights','barbell','iron','workout','lifting'],
 themes:['discipline','health','work'],
 note:'the boring hour that pays the year'},
{key:'phone', aliases:['screen','scrolling','social media','laptop','feed'],
 themes:['attention','envy','comfort'],
 note:'the theft nobody notices'},
{key:'crowd', aliases:['party','club','audience','concert','busy street'],
 themes:['envy','authentic','solitude'],
 note:'full room, empty feeling'},
{key:'mirror', aliases:['reflection','glass','portrait','self'],
 themes:['identity','authentic','worth'],
 note:'the only opinion that compounds'},
{key:'door', aliases:['threshold','stairs','gate','corridor','hallway','exit'],
 themes:['change','fear','time'],
 note:'the moment before the decision'},
{key:'ocean', aliases:['sea','horizon','mountain','landscape','sky','vast'],
 themes:['mortality','healing','purpose'],
 note:'scale that makes the problem small'},
{key:'neon', aliases:['city night','tokyo','arcade','sign','cyberpunk'],
 themes:['attention','envy','solitude'],
 note:'bright, loud, and alone in it'},
{key:'desert', aliases:['empty road','wasteland','dunes','wilderness'],
 themes:['solitude','purpose','change'],
 note:'the long quiet stretch nobody claps for'},
{key:'graveyard', aliases:['funeral','cemetery','grave','coffin'],
 themes:['mortality','time','regret'],
 note:'the deadline you keep ignoring'},
{key:'smoker', aliases:['cigarette','smoke','bar','whiskey','lighter'],
 themes:['ego','comfort','identity'],
 note:'the slow expensive comfort'},
{key:'parent', aliases:['mother','father','mom','dad','family photo','home'],
 themes:['family','gratitude','mortality'],
 note:'the clock running on the people who raised you'},
{key:'dog', aliases:['pet','cat','animal companion'],
 themes:['love','friendship','gratitude'],
 note:'loyalty without conditions'},
{key:'student', aliases:['desk','books','library','study','exam'],
 themes:['work','purpose','time'],
 note:'the unglamorous middle of becoming'},
{key:'dancer', aliases:['ballet','dance','stage','performer'],
 themes:['joy','authentic','work'],
 note:'discipline that looks like ease'},
{key:'astronaut', aliases:['space','stars','cosmos','moon','planet'],
 themes:['purpose','solitude','mortality'],
 note:'how small the argument was'},
{key:'samurai', aliases:['warrior','sword','knight','gladiator','armour','armor'],
 themes:['discipline','ego','mortality'],
 note:'the code held when nobody is watching'}
];

function resolveSubject(text){
  const q = String(text || '').toLowerCase().trim();
  if (!q) return null;
  for (let i = 0; i < SUBJECTS.length; i++){
    const s = SUBJECTS[i];
    if (s.key === q) return s;
  }
  for (let i = 0; i < SUBJECTS.length; i++){
    const s = SUBJECTS[i];
    if (q.indexOf(s.key) !== -1 || s.key.indexOf(q) !== -1) return s;
    for (let j = 0; j < s.aliases.length; j++){
      const a = s.aliases[j];
      if (q.indexOf(a) !== -1 || a.indexOf(q) !== -1) return s;
    }
  }
  return null;
}


/* ---- topics ----
   A topic is a shootable bundle: the concept, the themes that carry it, the
   subjects that embody it, a grade that suits it, and a plain instruction for
   the photograph. Type what you want to post about and get the brief, not just
   the words. */
const TOPICS = [
{key:'loneliness', aliases:['lonely','alone','isolation','solitude','no friends'],
 themes:['solitude','worth'], subjects:['wolf','driver','desert','neon'], palette:'Cold steel',
 query:'lone figure empty street night', shoot:'one small figure in a wide frame, 60% empty, cool cast, no eye contact'},
{key:'discipline', aliases:['self control','consistency','habits','routine','grind'],
 themes:['discipline','work'], subjects:['gym','boxer','athlete','samurai'], palette:'Bone',
 query:'dark gym early morning training', shoot:'cold light, repetition, sweat, nobody watching'},
{key:'heartbreak', aliases:['breakup','ex','lost love','broken heart'],
 themes:['love','regret','healing'], subjects:['rain','couple','door'], palette:'Faded VHS',
 query:'rain window night melancholy', shoot:'rain on glass or an empty half of a bed, soft flat range'},
{key:'time with family', aliases:['family','parents','mom','dad','home'],
 themes:['family','mortality','gratitude'], subjects:['parent','elder','child'], palette:'Nicotine',
 query:'kitchen family warm evening film', shoot:'warm domestic light, an older face, ordinary and unposed'},
{key:'money struggle', aliases:['broke','poor','debt','bills','cheap'],
 themes:['money','worth'], subjects:['businessman','driver','student'], palette:'Cold steel',
 query:'empty wallet late night convenience store', shoot:'cold fluorescent, plain surfaces, one warm accent'},
{key:'comparison', aliases:['envy','jealous','instagram','highlight reel'],
 themes:['envy','attention'], subjects:['phone','crowd','neon'], palette:'Mint neon',
 query:'phone glow face dark room', shoot:'a face lit only by a screen, everything else falling away'},
{key:'burnout', aliases:['tired','exhausted','overworked','drained'],
 themes:['rest','health'], subjects:['student','businessman','rain'], palette:'Faded VHS',
 query:'desk lamp late night tired', shoot:'3am desk, single lamp, slumped posture, flat low contrast'},
{key:'starting over', aliases:['restart','fresh start','new life','quit','change'],
 themes:['change','identity'], subjects:['door','driver','desert'], palette:'Bone',
 query:'open road sunrise packed bag', shoot:'a threshold or an open road, light in front of the subject'},
{key:'failure', aliases:['losing','rejected','mistake','lost','flop'],
 themes:['failure','fear'], subjects:['boxer','student','rain'], palette:'Fight Club',
 query:'boxer after the fight locker room', shoot:'after the loss, not during it, hard low-key light'},
{key:'drifting friends', aliases:['friendship','friends','grew apart','group chat'],
 themes:['friendship','change'], subjects:['crowd','couple','door'], palette:'Faded VHS',
 query:'friends walking away empty street', shoot:'two figures with distance between them, or an emptying room'},
{key:'stay weird', aliases:['be yourself','authentic','different','odd','individuality'],
 themes:['authentic','worth'], subjects:['musician','joker','mirror'], palette:'Mint neon',
 query:'unusual portrait bold colour', shoot:'one figure who does not match the room, a single saturated note'},
{key:'stay silent', aliases:['silence','quiet','do not react','argue','revenge'],
 themes:['ego','solitude'], subjects:['gangster','samurai','smoker'], palette:'Fight Club',
 query:'still portrait hard shadow cigarette', shoot:'a composed face, half in shadow, mouth closed, no gesture'},
{key:'memento mori', aliases:['death','mortality','dying','funeral','time left'],
 themes:['mortality','time'], subjects:['graveyard','elder','ocean'], palette:'Bone',
 query:'dusk horizon empty landscape', shoot:'scale against the figure, last light, no clutter'},
{key:'gratitude', aliases:['grateful','blessed','ordinary day','appreciate'],
 themes:['gratitude','joy'], subjects:['parent','child','dog'], palette:'Nicotine',
 query:'ordinary golden afternoon home', shoot:'a plain moment made warm, nothing staged or expensive'},
{key:'fear of starting', aliases:['scared','procrastinate','not ready','anxiety'],
 themes:['fear','change'], subjects:['door','student','athlete'], palette:'Cold steel',
 query:'person at doorway hesitating', shoot:'the instant before movement, subject facing away into light'},
{key:'phone addiction', aliases:['social media','scrolling','attention','screen time'],
 themes:['attention','comfort'], subjects:['phone','crowd','neon'], palette:'Mint neon',
 query:'blue screen light bedroom night', shoot:'screen as the only light source, face drained of colour'},
{key:'self worth', aliases:['enough','confidence','standards','not chosen','value'],
 themes:['worth','identity'], subjects:['mirror','king','wolf'], palette:'Bone',
 query:'portrait mirror strong side light', shoot:'direct gaze, strong side light, subject filling less than half the frame'},
{key:'health', aliases:['body','fitness','gym','diet','sick'],
 themes:['health','discipline'], subjects:['gym','athlete','boxer'], palette:'Cold steel',
 query:'runner cold morning breath', shoot:'effort in cold light, breath visible, unglamorous'},
{key:'purpose', aliases:['meaning','why','direction','lost','drifting'],
 themes:['purpose','change'], subjects:['ocean','astronaut','desert'], palette:'Cold steel',
 query:'small figure vast landscape', shoot:'scale — make the subject small against something enormous'},
{key:'regret', aliases:['should have','missed chance','too late','wish'],
 themes:['regret','time'], subjects:['door','elder','graveyard'], palette:'Faded VHS',
 query:'closing door dim hallway', shoot:'a door mid-close or a departing train, warm light leaving frame'},
{key:'unseen work', aliases:['grind','behind the scenes','no applause','reps'],
 themes:['work','ego'], subjects:['gym','musician','student'], palette:'Fight Club',
 query:'empty gym single light practice', shoot:'the practice, not the performance — empty seats behind them'},
{key:'permission to rest', aliases:['rest','sleep','break','slow down','pause'],
 themes:['rest','healing'], subjects:['rain','dog','parent'], palette:'Faded VHS',
 query:'morning bed soft light quiet', shoot:'soft flat light, unmade bed, nothing urgent in frame'},
{key:'choosing someone', aliases:['love','relationship','marriage','loyalty in love'],
 themes:['love','friendship'], subjects:['couple','parent','dog'], palette:'Nicotine',
 query:'couple ordinary morning kitchen', shoot:'the dull shared moment, not the romantic one'},
{key:'soft life', aliases:['joy','happy','peace','calm','slow living'],
 themes:['joy','rest'], subjects:['ocean','dog','child'], palette:'Nicotine',
 query:'sunlight linen slow morning', shoot:'warm, overexposed slightly, nothing sharp or urgent'},
{key:'no tomorrow', aliases:['urgency','now','today','waiting','someday'],
 themes:['time','mortality'], subjects:['graveyard','driver','door'], palette:'Bone',
 query:'last light empty road clock', shoot:'a clock, a last train, or the final minutes of daylight'},
{key:'parents aging', aliases:['old parents','grandparents','elderly','time left with them'],
 themes:['family','mortality','regret'], subjects:['elder','parent','child'], palette:'Nicotine',
 query:'elderly hands window warm light', shoot:'hands or a profile, warm and close, shallow depth'},
{key:'lonely at the top', aliases:['success','winning','rich and alone','achievement'],
 themes:['solitude','money','ego'], subjects:['businessman','king','neon'], palette:'Cold steel',
 query:'man alone in expensive empty room', shoot:'wealth shot coldly, one figure, too much space'},
{key:'comfort trap', aliases:['comfortable','stuck','safe','mediocre','settling'],
 themes:['comfort','change'], subjects:['phone','smoker','crowd'], palette:'Faded VHS',
 query:'sofa blue tv light living room', shoot:'warm sealed interior with a cold window behind it'},
{key:'becoming', aliases:['identity','growth','future self','who you are'],
 themes:['identity','purpose'], subjects:['mirror','child','samurai'], palette:'Bone',
 query:'reflection portrait two versions', shoot:'a reflection, a doorway, or a young face — two states in one frame'},
{key:'healing', aliases:['recovery','therapy','moving on','grief'],
 themes:['healing','change'], subjects:['rain','ocean','door'], palette:'Faded VHS',
 query:'rain clearing soft light window', shoot:'weather turning, soft flat range, room to breathe'},
{key:'loyalty', aliases:['betrayal','trust','real ones','fake friends'],
 themes:['friendship','worth'], subjects:['gangster','dog','samurai'], palette:'Fight Club',
 query:'two figures dark interior loyalty', shoot:'two subjects, one turned away — or a dog, which needs no explanation'},
{key:'carrying it alone', aliases:['mask','hero','two lives','secret','burden','needed'],
 themes:['identity','love','solitude'], subjects:['spider-man','batman','soldier'], palette:'Cold steel',
 query:'masked figure rooftop night city',
 shoot:'two people in frame with a gap between them, or one figure after the crowd has gone. Light one face, leave the other in shadow — the poster is about the thing the second person cannot see.'},
{key:'be kind', aliases:['kindness','kind','compassion','gentle','empathy','nice','good person'],
 themes:['kindness','love','gratitude'], subjects:['gangster','dog','child','boxer'], palette:'Nicotine',
 query:'tough man gentle moment street portrait',
 shoot:'lead with contrast — a hard-looking subject caught in a gentle act. Tattooed hands and a stray dog, a fighter with a child, warm light on a cold face. The gentleness reads as strength because the face does not.'},
{key:'patience', aliases:['slow','progress','trust the process','early'],
 themes:['time','discipline'], subjects:['desert','ocean','student'], palette:'Cold steel',
 query:'long empty road horizon walking', shoot:'distance in frame, a subject small and still moving'},
{key:'chasing money', aliases:['make money','get rich','hustle','grind for money','financial success','chase the bag','wolf of wall street','money hunger','self value'],
 themes:['money','worth','purpose'], subjects:['businessman','wolf','king'], palette:'Nicotine',
 query:'confident businessman cash close-up office',
 shoot:'a tight, confident portrait with a wealth signifier in frame — cash, a watch, a ring — warm gold light, direct almost-smirking eye contact. Show the hunger, not the guilt.'}
];

function findTopics(q){
  const query = String(q || '').toLowerCase().trim();
  if (!query) return TOPICS.slice();
  const terms = query.split(/\s+/).filter(x => x.length > 1);
  const wanted = expand(terms);
  return TOPICS.map(t => {
    const hay = (t.key + ' ' + t.aliases.join(' ') + ' ' + t.themes.join(' ') + ' ' +
                 t.shoot + ' ' + t.query).toLowerCase();
    let hits = 0;
    wanted.forEach(w => { if (hay.indexOf(w) !== -1) hits++; });
    // an exact name has to beat a topic that merely contains the word
    if (t.key === query) hits += 12;
    else if (t.aliases.indexOf(query) !== -1) hits += 8;
    else if (t.key.indexOf(query) !== -1) hits += 4;
    else t.aliases.forEach(a => {
      if (a.indexOf(query) !== -1 || query.indexOf(a) !== -1) hits += 2;
    });
    return {t, hits};
  }).filter(x => x.hits > 0)
    .sort((a,b) => b.hits - a.hits)
    .map(x => x.t);
}

/* Lines that belong to a topic.
   The first theme listed is what the topic IS; the rest are adjacent. A flat
   match let an adjacent theme outrank the subject of the topic itself, so the
   primary theme is weighted well above the secondaries. */
function topicLines(topic, n, seen, opts){
  n = n || 4;
  seen = seen || new Set();
  opts = opts || {};
  const perFam = opts.perFamily || 1;
  const primary = topic.themes[0];
  const secondary = new Set(topic.themes.slice(1));

  const pool = PATTERNS
    .filter(p => p.themes.indexOf(primary) !== -1 || p.themes.some(th => secondary.has(th)));

  /* One pass over the pool, skipping anything in `avoid`. */
  function draw(avoid, want){
    const ranked = pool.map(p => {
      const isPrimary = p.themes.indexOf(primary) !== -1;
      return {p, isPrimary, weight: isPrimary ? 1 : 0.38, jitter: Math.random()*0.07};
    }).sort((a,b) => (b.weight + b.jitter) - (a.weight + a.jitter));

    const got = [], fams = Object.create(null);
    for (let i = 0; i < ranked.length && got.length < want; i++){
      const c = ranked[i];
      // the topic's own theme usually shares one family (every kindness line
      // sits in `kindness`), so a flat cap of 1 would throttle it to one line
      const cap = c.isPrimary ? (opts.primaryPerFamily || 3) : perFam;
      if ((fams[c.p.fam] || 0) >= cap) continue;
      let best = null;
      for (let j = 0; j < 5; j++){
        const k = fill(c.p.k, c.p.bank), h = fill(c.p.h, c.p.bank);
        if (avoid.has(k + '|' + h)) continue;
        const sc = scoreLine(k, h, c.p.voice);
        if (!best || sc.score > best.score) best = Object.assign({k, h}, sc);
      }
      if (!best) continue;
      fams[c.p.fam] = (fams[c.p.fam] || 0) + 1;
      got.push(Object.assign({pat: c.p, primary: c.isPrimary}, best,
        {rank: c.weight*0.65 + (best.score/10)*0.35}));
    }
    return got;
  }

  let out = draw(seen, n);
  let recycled = false;

  /* A topic has a finite pool. Once it is spent, forget what has been shown
     and start the rotation again rather than handing back an empty card —
     still never repeating a line inside one card. */
  if (out.length < n){
    recycled = true;
    const within = new Set(out.map(l => l.k + '|' + l.h));
    seen.clear();
    out = out.concat(draw(within, n - out.length));
  }
  out.forEach(l => seen.add(l.k + '|' + l.h));
  out.sort((a,b) => b.rank - a.rank);
  out.recycled = recycled;
  return out;
}

const FUNCTION_WORDS = new Set(("is are the a an you your yours to of and or that it not no be " +
  "will was than for in on with but if what how why when they them we i my me this these those " +
  "don't you're they'll it's isn't wasn't doesn't after into over out up as at do does did " +
  "have has had one only every some there").split(' '));

/* ---------- scoring: what actually makes one of these land ---------- */
function scoreLine(k, h, voice){
  const drive = voice === 'drive';
  const kw = String(k).trim().split(/\s+/), hw = String(h).trim().split(/\s+/);
  const total = kw.length + hw.length;
  let s = 0; const notes = [];

  // the drive voice earns its length; the stoic voice does not
  const mix = voice === 'mix';
  const hHi = drive ? 8 : mix ? 5 : 4,
        kHi = drive ? 9 : mix ? 6 : 5,
        tHi = drive ? 17 : mix ? 11 : 9,
        tailHi = drive ? 12 : mix ? 9 : 6;

  if (hw.length >= 2 && hw.length <= hHi) s += 3;
  else if (hw.length === 1 || hw.length === hHi + 1) s += 1;
  else notes.push('header is long');

  const lastK = kw[kw.length-1].toLowerCase().replace(/[^a-z'’]/g,'').replace(/’/g,"'");
  if (FUNCTION_WORDS.has(lastK)){ s += 3; notes.push('dangling break'); }

  if (kw.length >= 2 && kw.length <= kHi) s += 2; else notes.push('kicker off-length');
  if (total <= tHi) s += 1; else notes.push('too long for a thumbnail');
  if (/\byou\b|\byour\b|you’re|you're/i.test(k + ' ' + h)){ s += 1; notes.push('second person'); }

  const lastH = hw[hw.length-1].replace(/[^a-z]/gi,'');
  if (lastH.length <= tailHi) s += 1; else notes.push('soft landing');
  if (/[,;:]/.test(k + h)){ s -= 2; notes.push('punctuation kills it'); }

  return {score: Math.max(0, Math.min(10, s)), total, notes};
}

/* ---------- generation ---------- */
const pick = a => a[Math.floor(Math.random()*a.length)];
function fill(tpl, bank){
  return String(tpl).replace(/\{(\w+)\}/g, (m, slot) =>
    (bank && bank[slot]) ? pick(bank[slot]) : m);
}
function variants(p){
  let n = 1;
  const slots = (p.k + ' ' + p.h).match(/\{(\w+)\}/g) || [];
  slots.forEach(s => {
    const key = s.slice(1,-1);
    if (p.bank && p.bank[key]) n *= p.bank[key].length;
  });
  return n;
}
function eligible(themes, ids){
  return PATTERNS.filter(p =>
    (!ids   || !ids.size    || ids.has(p.id)) &&
    (!themes || !themes.size || p.themes.some(t => themes.has(t))));
}
/* Draw `n` distinct lines. `seen` is a Set of "kicker|header" keys to avoid. */
function forge(n, themes, ids, seen){
  const pool = eligible(themes, ids);
  const out = [];
  seen = seen || new Set();
  let tries = 0;
  while (out.length < n && tries < n*80 && pool.length){
    tries++;
    const p = pick(pool);
    const k = fill(p.k, p.bank), h = fill(p.h, p.bank);
    const key = k + '|' + h;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(Object.assign({k, h, pat: p}, scoreLine(k, h, p.voice)));
  }
  return out;
}

/* ---------- matching statements to a photograph ----------
   Each theme declares which visual qualities it belongs on. A pattern inherits
   the affinity of its themes, so a dark, cool, isolated frame pulls solitude and
   mortality forward and pushes comfort and healing back. */
const THEME_AFFINITY = {
  discipline: {dark:.55, harsh:.85, cool:.40, empty:.30},
  mortality:  {dark:.90, empty:.70, soft:.30, cool:.35},
  ego:        {warm:.50, chroma:.55, bright:.30, isolated:.35},
  solitude:   {empty:.90, isolated:.80, dark:.50, cool:.45},
  money:      {warm:.60, chroma:.60, bright:.40},
  comfort:    {warm:.70, soft:.70, bright:.45},
  fear:       {dark:.70, red:.75, harsh:.50},
  time:       {soft:.45, empty:.55, bright:.30},
  work:       {harsh:.80, cool:.50, dark:.40},
  healing:    {soft:.80, bright:.55, warm:.40},
  attention:  {neon:.80, chroma:.70, bright:.35},
  identity:   {isolated:.70, empty:.50, dark:.40},
  failure:    {dark:.70, harsh:.65, isolated:.50},
  family:     {warm:.80, soft:.70, bright:.45},
  joy:        {bright:.80, warm:.70, chroma:.50, soft:.45},
  love:       {warm:.80, soft:.65, chroma:.40, bright:.35},
  gratitude:  {warm:.70, bright:.60, soft:.60},
  envy:       {chroma:.65, neon:.55, bright:.40},
  regret:     {dark:.70, soft:.60, empty:.60},
  rest:       {soft:.80, empty:.60, dark:.40},
  worth:      {isolated:.65, empty:.50, dark:.40},
  health:     {harsh:.55, bright:.45, cool:.35},
  change:     {harsh:.50, cool:.40, empty:.55},
  purpose:    {empty:.65, dark:.45, isolated:.50},
  authentic:  {isolated:.75, chroma:.55, empty:.45, neon:.35},
  friendship: {warm:.65, soft:.55, bright:.40, isolated:.30},
  kindness:   {warm:.75, soft:.70, bright:.45, isolated:.25}
};

const TRAIT_KEYS = ['dark','bright','warm','cool','chroma','empty',
                    'isolated','harsh','soft','red','neon'];

/* Cosine similarity across the WHOLE trait space. Iterating only the keys a
   theme declares let every theme saturate near 1.0 whenever its own traits were
   present, which is why one line kept winning on unrelated images. Traits the
   theme does not claim now count against it. */
function themeFit(theme, t){
  const a = THEME_AFFINITY[theme];
  if (!a) return 0;
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < TRAIT_KEYS.length; i++){
    const k = TRAIT_KEYS[i], av = a[k] || 0, bv = t[k] || 0;
    dot += av*bv; na += av*av; nb += bv*bv;
  }
  return (na && nb) ? dot/Math.sqrt(na*nb) : 0;
}
function patternFit(p, t){
  return p.themes.reduce((m, th) => Math.max(m, themeFit(th, t)), 0);
}

/* Recommend statements for a specific photograph.

   Three things keep the set varied:
     - at most `perFamily` patterns from any one rhetorical family
     - a fatigue term, so a pattern already used this session sinks
     - a small random nudge, to break the ties that identical fits produce
   Rank still blends belonging (fit) with how well the line reads (score). */
const usage = Object.create(null);
function resetFatigue(){ for (const k in usage) delete usage[k]; }

function recommend(t, n, seen, opts){
  n = n || 5;
  seen = seen || new Set();
  opts = opts || {};
  const perFam = opts.perFamily || 1;
  const pool = PATTERNS.filter(p => !opts.voices || opts.voices.has(p.voice));
  if (!pool.length) return [];

  // a named subject pulls its own concepts forward without overriding the plate
  const subj = resolveSubject(opts.subject);
  const subjThemes = subj ? new Set(subj.themes) : null;
  const ranked = pool.map(p => {
    const fit = patternFit(p, t);
    const fatigue = 1 / (1 + (usage[p.id] || 0) * 0.75);
    let boost = 1;
    if (subjThemes){
      const hits = p.themes.filter(th => subjThemes.has(th)).length;
      boost = 1 + 1.2 * (hits / p.themes.length);
    }
    return {p, fit, w: fit*fatigue*boost + Math.random()*0.05};
  }).sort((a,b) => b.w - a.w);

  // if the seen-set has swallowed the pool, let it come round again
  let exhausted = true;
  for (let i = 0; i < ranked.length && exhausted; i++){
    const p = ranked[i].p;
    for (let j = 0; j < 3; j++)
      if (!seen.has(fill(p.k, p.bank) + '|' + fill(p.h, p.bank))){ exhausted = false; break; }
  }
  if (exhausted) seen.clear();

  const out = [], fams = Object.create(null);
  for (let i = 0; i < ranked.length && out.length < n; i++){
    const p = ranked[i].p, fit = ranked[i].fit;
    if ((fams[p.fam] || 0) >= perFam) continue;
    let best = null;
    for (let j = 0; j < 6; j++){                 // a few draws, keep the best read
      const k = fill(p.k, p.bank), h = fill(p.h, p.bank);
      if (seen.has(k + '|' + h)) continue;
      const sc = scoreLine(k, h, p.voice);
      if (!best || sc.score > best.score) best = Object.assign({k, h}, sc);
    }
    if (!best) continue;
    seen.add(best.k + '|' + best.h);
    fams[p.fam] = (fams[p.fam] || 0) + 1;
    usage[p.id] = (usage[p.id] || 0) + 1;
    out.push(Object.assign({pat: p, fit}, best, {
      rank: fit*0.6 + (best.score/10)*0.4,
      why: p.themes.map(th => ({th, f: themeFit(th, t)}))
                   .sort((a,b) => b.f - a.f)[0].th
    }));
  }
  return out.sort((a,b) => b.rank - a.rank);
}

/* ---------- keyword search ----------
   Matches the query against everything a pattern is made of: its name, family,
   themes, the image note, both templates, and every word in its slot banks. */
function patternText(p){
  let s = [p.id, p.name, p.fam, p.themes.join(' '), p.pairs, p.k, p.h].join(' ');
  if (p.bank) for (const k in p.bank) s += ' ' + p.bank[k].join(' ');
  return s.toLowerCase().replace(/[^a-z0-9 ]/g,' ');
}
/* People type the feeling, not the theme name. Map the words they actually
   reach for onto the vocabulary the patterns are written in. */
const SYNONYMS = {
  jealous:['envy','compare','highlight'], jealousy:['envy','compare'],
  envious:['envy'], comparison:['envy','compare'],
  parents:['family','older','home','raised','them'], parent:['family'],
  mom:['family','call'], mum:['family','call'], mother:['family','call'],
  dad:['family','call'], father:['family','call'], grandma:['family'], grandpa:['family'],
  kids:['family'], children:['family'], son:['family'], daughter:['family'],
  home:['family'], siblings:['family'],
  happy:['joy','happiness','allowed'], happiness:['joy'], positive:['joy','gratitude'],
  smile:['joy'], hope:['healing','joy'], grateful:['gratitude'], thankful:['gratitude'],
  blessed:['gratitude'], pray:['gratitude'], god:['gratitude'], faith:['gratitude'],
  sad:['regret','healing'], depressed:['healing','rest'], grief:['mortality','healing'],
  anxious:['fear'], anxiety:['fear'], scared:['fear'], afraid:['fear'], worry:['fear'],
  broke:['money'], rich:['money'], cash:['money'], salary:['money'], debt:['money'],
  gym:['health','train','body'], fit:['health','body'], fitness:['health','body'],
  diet:['health'], weight:['health','body'], sick:['health'],
  friends:['friendship','bond','circle','people'], friendship:['friendship','bond','circle'],
  friend:['friendship','bond','circle'], betrayed:['friendship','bond','loyalty'],
  loyal:['friendship','loyalty'], loyalty:['friendship','loyalty'],
  bestie:['friendship'], mates:['friendship'], crew:['friendship','circle'],
  circle:['friendship','circle'], group:['friendship','circle'],
  kind:['kindness','kind','gentle'], kindness:['kindness','kind','gentle'],
  compassion:['kindness','gentle'], gentle:['kindness','gentle','soft'],
  empathy:['kindness','carrying'], nice:['kindness','kind'], help:['kindness','give'],
  generous:['kindness','give'], forgive:['kindness','healing'],
  silence:['silence','quiet','ego'], silent:['silence','quiet'], quiet:['silence','quiet'],
  argue:['silence','arguing','ego'], argument:['silence','arguing'], arguing:['silence'],
  react:['silence','reaction'], reaction:['silence','reaction'], respond:['silence','reply'],
  reply:['silence','reply'], explain:['silence','explain','ego'], defend:['silence','defending'],
  prove:['silence','ego','proof'], revenge:['silence','ego','proof'],
  drama:['silence','ego','attention'], gossip:['silence','ego'], haters:['silence','ego','envy'],
  petty:['silence','ego'], unbothered:['silence','ego'], humble:['silence','ego'],
  fake:['friendship','loyalty'], distant:['friendship','distance'],
  breakup:['love','change'], heartbreak:['love','regret'], ex:['love','change'],
  dating:['love'], marriage:['love'], relationship:['love','bond'],
  lonely:['solitude','alone'], loneliness:['solitude','alone'],
  job:['work'], career:['work','purpose'], boss:['work'], burnout:['rest'],
  tired:['rest','lazy'], exhausted:['rest'], sleep:['rest'],
  quit:['failure','change'], quitting:['failure'], lost:['failure','loss'],
  rejected:['failure'], rejection:['failure'], mistake:['failure'],
  motivation:['discipline'], lazy:['discipline','rest'], procrastinate:['discipline','later'],
  school:['work','purpose'], study:['work','discipline'], exam:['work'],
  death:['mortality'], die:['mortality'], dying:['mortality'], funeral:['mortality'],
  purpose:['purpose','meaning'], meaning:['purpose'], stuck:['change','comfort'],
  change:['change','restart'], restart:['restart','change'], growth:['change','purpose'],
  phone:['attention','scrolling'], social:['attention'], instagram:['attention'],
  weird:['authentic','odd','strange'], strange:['authentic','odd'], odd:['authentic'],
  myself:['authentic','yourself'], authentic:['authentic','yourself'],
  yourself:['authentic'], different:['authentic'], unique:['authentic','odd'],
  normal:['authentic','costume'], fit:['authentic','blend'], belong:['authentic','blend'],
  mask:['authentic'], copy:['authentic','copy'], confidence:['authentic','worth'],
  shy:['authentic','shrink'], introvert:['solitude','authentic'], judged:['authentic','ego'],
  tomorrow:['urgency','tomorrow','later'], now:['urgency','now'], today:['urgency','today'],
  urgent:['urgency'], deadline:['urgency','time'], someday:['urgency','later'],
  waiting:['urgency','later'], monday:['urgency'], ready:['urgency','fear']
};

function expand(terms){
  const out = [];
  terms.forEach(t => {
    out.push(t);
    if (SYNONYMS[t]) out.push.apply(out, SYNONYMS[t]);
  });
  return out;
}

function search(q){
  const terms = String(q).toLowerCase().split(/\s+/).filter(x => x.length > 1);
  if (!terms.length) return PATTERNS.slice();
  const wanted = expand(terms);
  return PATTERNS.map(p => {
    const txt = patternText(p);
    let hits = 0;
    wanted.forEach(term => { if (txt.indexOf(term) !== -1) hits++; });
    return {p, hits};
  }).filter(x => x.hits > 0)
    .sort((a,b) => b.hits - a.hits)
    .map(x => x.p);
}

/* Rank every possible break point of a sentence the user typed. */
function bestSplit(sentence, voice){
  const w = String(sentence).trim().replace(/\s+/g,' ').split(' ');
  if (w.length < 3) return [];
  const out = [];
  for (let i=1; i<w.length; i++){
    const k = w.slice(0,i).join(' '), h = w.slice(i).join(' ');
    out.push(Object.assign({k, h}, scoreLine(k, h, voice)));
  }
  return out.sort((a,b) => b.score - a.score);
}

/* Integrity: theme names and family names look alike, and a family name used
   as a theme silently removes the pattern from theme filtering. Check once at
   load so it surfaces in the console instead of shipping quietly. */
(function auditPatterns(){
  const problems = [];
  const ids = Object.create(null);
  PATTERNS.forEach(p => {
    if (ids[p.id]) problems.push('duplicate id: ' + p.id);
    ids[p.id] = 1;
    if (!p.fam) problems.push(p.id + ' has no family');
    if (!p.voice) problems.push(p.id + ' has no voice');
    (p.themes || []).forEach(t => {
      if (THEMES.indexOf(t) === -1) problems.push(p.id + ': "' + t + '" is not a theme');
    });
    const slots = (p.k + ' ' + p.h).match(/\{(\w+)\}/g) || [];
    slots.forEach(sl => {
      const key = sl.slice(1,-1);
      if (!p.bank || !p.bank[key]) problems.push(p.id + ': slot {' + key + '} has no bank');
    });
  });
  // two patterns producing the identical line is always a mistake
  const produced = Object.create(null);
  PATTERNS.forEach(p => {
    const slots = [...new Set(((p.k + ' ' + p.h).match(/\{(\w+)\}/g) || [])
                    .map(x => x.slice(1,-1)))];
    let combos = [{}];
    slots.forEach(sl => {
      const next = [];
      combos.forEach(c => (p.bank[sl] || ['']).forEach(v => {
        const o = Object.assign({}, c); o[sl] = v; next.push(o);
      }));
      combos = next;
    });
    combos.forEach(c => {
      const f = t => t.replace(/\{(\w+)\}/g, (m, x) => c[x] !== undefined ? c[x] : m);
      const key = (f(p.k) + '|' + f(p.h)).toLowerCase().replace(/[^a-z| ]/g, '');
      if (produced[key] && produced[key] !== p.id)
        problems.push('duplicate line "' + key.replace('|', ' / ') + '" from ' +
                      produced[key] + ' and ' + p.id);
      produced[key] = p.id;
    });
  });

  if (problems.length && typeof console !== 'undefined')
    console.warn('LineEngine pattern audit — ' + problems.join(' | '));
  root.__lineEngineAudit = problems;
})();

const families = () => [...new Set(PATTERNS.map(p => p.fam))];
const totalVariants = () => PATTERNS.reduce((a,p) => a + variants(p), 0);

root.LineEngine = {THEMES, PATTERNS, VOICES, FUNCTION_WORDS, THEME_AFFINITY, scoreLine, fill, pick,
                   variants, eligible, forge, bestSplit, families, totalVariants,
                   themeFit, patternFit, recommend, search, patternText,
                   TRAIT_KEYS, resetFatigue, SYNONYMS, SUBJECTS, resolveSubject, TOPICS, findTopics, topicLines};

if (typeof module !== 'undefined' && module.exports) module.exports = root.LineEngine;

})(typeof window !== 'undefined' ? window : globalThis);
