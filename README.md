# dIntDes-prototype
Sådan bruges prototypen:
========================

1. Åbn start.html (og klik på den store grønne knap). Denne startside er som sådan ikke en del af interfacet, men simulerer blot at brugeren aktiverer bruseren.

2. Du vil nu se en ny side (shower.html) -- bruseren registrer hvem du er og dit bad er startet. På skærmen vises informationer om dit bad (dit tidsforbrug, hvor meget vand du har brugt, den nuværende vandtemperatur og vandstyrken). Der kan interageres med temperatur (WARMER / COLDER) og vandstyrke (MORE WATER / LESS WATER) via knapperne i bunden (som ikke er tænkt som en del af det endelige interface), hvorefter interfacet vil reagere på instruktionerne. 

3. Tryk 'STOP', når du er færdig med at bade

4. Du vil nu se en statistisk oversigt over din families vandforbrug i badet. Dette er den centrale del af programmet. Det er her man har mulighed for at få et overblik over vandforbruget i badet (samlet og individuelt forbrug) og sammenligne sit eget forbrug med de andre i familien. I denne prototype har du mulighed for at se det samlede vandforbrug i liter fra bruseren for familien, for de seneste 30 dage (Total water consumption). Der vises også en graf for hver person i familien. Søjlerne skal symbolisere personens vandforbrug, så en lav søjle symboliserer et lavt forbrug og omvendt. Dette giver et overblik over hvilke personer i familien der har klaret sig bedst i den seneste måned. Derudover vises der en infoboks nederst. Det er meningen at man skal kunne trykke på en søjle, og få mere information om den persons forbrug som søjlen repræsenterer. I denne prototype kan det ikke lade sig gøre, men der vises information om 'dit' forbrug, såsom dit forbrug de seneste 30 dage, den gennemsnitlige vandtemperatur for dit bad, dit gennemsnitlige tidsforbrug og en form for point, som giver dig en samlet score udfra den information som systemet har om dit forbrug. Det er meningen at denne del af systemet skal indbyde til noget konkurrence og give en 'Challenging' User Experience.

Adskillelse:
===========

Egentligt hører step 1-3 (ovenfor) til interaktionen mellem brugeren, bruseren og systemet -- interaktionen sker under et bad. Step 4 er en separat funktionalitet som kan tilgås via fx web-/mobilapplikation. Derfor er det i realiteten ikke hensigten, at man går fra step 3 til 4 i samme interaktionssession.