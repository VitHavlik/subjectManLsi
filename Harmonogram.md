# Shrnutí schůzek a podněty pro další řešení

## Schůzka 13.10.
 
**Shrnutí**

> Schůzku asi netřeba shrnovat :)
> Důležitý milník je naplánovat další schůzi po zapnutí školního prostředí pro splnění náležitostí.

**Dodělat Scope a Business requests**


## K zamyšlení:

### Základní informace

1) **Musíme tvořit předměty pro naší školu nebo je to jedno?** *Tvoříme aplikaci na jejich správu, to jakými daty jí naplníme pro ukázky je čistě na nás. Nicméně pro usnadnění práce bych jako vzorová data použil už existující předměty z naší školy - dávají smysl a nemusíme vymýšlet nic nového.*
2) **Je stanoven někde počet předmětů?** - *Ne, počet vytvořených předmětů se omezí při návrhnu aplikačního modelu na úrovni databáze na smysluplné číslo (viděl bych to na 1000).*
3) **Musí zde být i obory nebo je to jen jeden obor s x předměty?** *Podle zadání jsem pochopil, že budeme mít i obory.*
4) **Pokud by bylo oborů víc, může student studovat více oborů nebo si zaposovat předměty z jiných oborů?** *To pro tu aplikaci není relevantní. Neřešíme přihlašování na obory ani zápisy předmětů.*

### Programová logika

Program má mít autorizaci 3-tich stran (Google, Facebook a nevim co dalšího,...)
Nemyslím si že bychom dostali databázi učitelů či studentů.

Jak bude probíhat registrace? Uděláme ji pouze manuálně že nátáhneme xxx studentů a učitelů do databáze nebo udeláme registrační formulář a přes něj to tam nahrajeme, když by chtěl někdo ze zkoušejících vyzkoušet zda to přihlášení funguje i jim.

Jakým způsobem bychom vyřešili práva pro učitele a jestli tam nějaké budou a zda to má význam? 
Mohli by maximálně přidat nebo odebrat předmět nebo upravit obsah předmětu. 

Provádět změny na předmětech si ale budou dělat jen studenti sami.

Pokud nebude uživatel přihlášen uvidí pouze nějaký obsah předmětu.
Po přihlášení se mu zobrazí zbytek s výukovými materiály atd...

### Uživatelé + práva

Celou správu uživatelů (registrace, přihlašování) má na starosti Plus4U, tu řešit nemusíme. Budeme řešit pouze napojení na uuBusinessTerritory, přes které se spravují oprávnění.

Obecně bych to viděl na následující profily:
-  **Authorities** - spravují práva
-  **Executives** - práva vytvářet a upravovat všechno
-  **Teachers** - upravují předměty, vytvářejí topicy, linkují studijní materiály
-  **Students** - právo procházet studijní materiály k předmětům
-  **Auditors** - právo zobrazit všechno (standardní profil)
-  **(Public)** - právo zobrazit studijní obory, předměty a jejich osnovy

Všechny profily budou inkluzivní - tzn. vyšší profil má stejná práva jako nižší profil + něco navíc.

