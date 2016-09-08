function Person(name) {

    var candidateIndex = 0;

    this.name = name;
    this.fiance = null;
    this.candidates = [];

    this.rank = function(p) {
        for (var i = 0; i < this.candidates.length; i++)
            if (this.candidates[i] === p) return i;
        return this.candidates.length + 1;
    }

    this.prefers = function(p) {
        return this.rank(p) < this.rank(this.fiance);
    }

    this.nextCandidate = function() {
        if (candidateIndex >= this.candidates.length) return null;
        return this.candidates[candidateIndex++];
    }

    this.engageTo = function(p) {
        if (p.fiance) p.fiance.fiance = null;
        p.fiance = this;
        if (this.fiance) this.fiance.fiance = null;
        this.fiance = p;
    }

    this.swapWith = function(p) {
        console.log("%s & %s swap partners", this.name, p.name);
        var thisFiance = this.fiance;
        var pFiance = p.fiance;
        this.engageTo(pFiance);
        p.engageTo(thisFiance);
    }
}

function isStable(guys, gals) {
    for (var i = 0; i < guys.length; i++)
        for (var j = 0; j < gals.length; j++)
            if (guys[i].prefers(gals[j]) && gals[j].prefers(guys[i]))
                return false;
    return true;
}

function engageEveryone(guys) {
    var done;
    do {
        done = true;
        for (var i = 0; i < guys.length; i++) {
            var guy = guys[i];
            if (!guy.fiance) {
                var gal = guy.nextCandidate();
                if (gal != undefined && (!gal.fiance || gal.prefers(guy))) {
                    guy.engageTo(gal);
                    done = false;
                }
            }
        }
    } while (!done);
    var result = '';
    guys.forEach((x) => {
      result = result.concat(`${x.name} married with his \t\t\t\t\t\t ${x.rank(x.fiance)}th and ${!x.fiance || x.fiance.name + ' married \t\t\t\t\t' + x.fiance.rank(x) + 'th'}<br/>`);
    });
    return result;
}

function createAll(proposers, receivers) {
  var guys = proposers.map((x) => {
    var p = new Person(x['name']);
    p.priority_list = x['priority_list'];
    p.id = x['id'];
    return p;
  });

  var gals = receivers.map((x) => {
    var p = new Person(x['name']);
    p.priority_list = x['priority_list'];
    p.id = x['id'];
    return p;
  });

  guys.forEach((x) => {
    x.priority_list.forEach((ple)=>{
      x.candidates.push(gals[ple-1]);
    });
  });
  gals.forEach((x) => {
    x.priority_list.forEach((ple)=>{
      x.candidates.push(guys[ple-1]);
    });
  });
  guys.forEach((x) => {
    console.log(`${x.name} and ${x.candidates.map((e)=>{return e.name;})}`);
  });
  engageEveryone(gals);
  guys.forEach((x) => {
    console.log(`${x.name} married with his \t\t\t\t\t\t ${x.rank(x.fiance)}th and ${!x.fiance || x.fiance.id + ' married \t\t\t\t\t' + x.fiance.rank(x) + 'th'}`);
  });
}

export { Person, engageEveryone };

// var proposers = [
//     {
//       "id": 1,
//       "name": "Svejk",
//       "priority_list": [12, 4, 3, 2, 5, 6, 7, 8, 9, 10, 11, 1]
//     },
//     {
//       "id": 2,
//       "name": "Zotya",
//       "priority_list": [1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 3, 2]
//     },
//     {
//       "id": 3,
//       "name": "Bastya elvtars",
//       "priority_list": [3, 5, 6, 7, 8, 9, 10, 11, 12, 2, 1, 4]
//     },
//     {
//       "id": 4,
//       "name": "Vuk",
//       "priority_list": [5, 6, 7, 8, 9, 10, 11, 12, 4, 3, 2, 1]
//     },
//     {
//       "id": 5,
//       "name": "l",
//       "priority_list": [1, 4, 3, 5, 6, 7, 8, 9, 10, 11, 12, 2]
//     },
//     {
//       "id": 6,
//       "name": "m",
//       "priority_list": [1, 4, 3, 2, 5, 6, 7, 8, 9, 10, 11, 12]
//     },
//     {
//       "id": 7,
//       "name": "n",
//       "priority_list": [3, 2, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12]
//     },
//     {
//       "id": 8,
//       "name": "o",
//       "priority_list": [4, 3, 2, 1, 5, 6, 7, 8, 9, 10, 11, 12]
//     },
//     {
//       "id": 9,
//       "name": "p",
//       "priority_list": [1, 4, 3, 2, 5, 6, 7, 8, 9, 10, 11, 12]
//     },
//     {
//       "id": 10,
//       "name": "q",
//       "priority_list": [5, 6, 7, 8, 9, 10, 11, 12, 1, 4, 3, 2]
//     },
//     {
//       "id": 11,
//       "name": "r",
//       "priority_list": [3, 5, 6, 7, 8, 9, 10, 11, 12, 2, 1, 4]
//     },
//     {
//       "id": 12,
//       "name": "f",
//       "priority_list": [4, 3, 2, 5, 6, 7, 8, 9, 10, 11, 12, 1]
//     },
//     {
//       "id": 13,
//       "name": "h",
//       "priority_list": [4, 3, 2, 5, 6, 7, 8, 9, 10, 11, 12, 1]
//     },
//     {
//       "id": 14,
//       "name": "j",
//       "priority_list": [4, 3, 2, 5, 6, 7, 8, 9, 10, 11, 12, 1]
//     },
//     {
//       "id": 15,
//       "name": "kj",
//       "priority_list": [4, 3, 2, 5, 6, 7, 8, 10, 9, 11, 12, 1]
//     },
//     {
//       "id": 16,
//       "name": "kjoo",
//       "priority_list": [4, 3, 2, 10, 6, 7, 8, 9, 5, 11, 12, 1]
//     },
//     {
//       "id": 17,
//       "name": "kjuj",
//       "priority_list": [4, 3, 2, 5, 6, 7, 8, 9, 10, 11, 12, 1]
//     }
//   ];
//
//   var receivers = [
//       {
//         "id": 1,
//         "name": "vidampark",
//         "priority_list": [3, 2, 4, 1, 5, 16, 17, 6, 14, 7, 8, 9, 10, 15, 11, 13, 12],
//         "participants_number": 1
//       },
//       {
//         "id": 2,
//         "name": "allatkert",
//         "priority_list": [2, 3, 4, 16, 17, 1, 5, 6, 7, 8, 14, 9, 15, 10, 11, 12, 13],
//         "participants_number": 1
//       },
//       {
//         "id": 3,
//         "name": "cirkusz",
//         "priority_list": [4, 15, 1, 2, 3, 16, 17, 5, 6, 7, 8, 9, 10, 11, 14, 12, 13],
//         "participants_number": 1
//       },
//       {
//         "id": 4,
//         "name": "mozi",
//         "priority_list": [15, 16, 17, 1, 4, 13, 2, 3, 5, 6, 7, 8, 9, 10, 11, 14, 12],
//         "participants_number": 1
//       },
//       {
//         "id": 5,
//         "name": "x",
//         "priority_list": [3, 2, 4, 13, 16, 17, 1, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15],
//         "participants_number": 1
//       },
//       {
//         "id": 6,
//         "name": "y",
//         "priority_list": [16, 17, 2, 3, 4, 1, 5, 6, 13, 7, 8, 9, 10, 11, 12, 15, 14],
//         "participants_number": 1
//       },
//       {
//         "id": 7,
//         "name": "z",
//         "priority_list": [4, 1, 2, 3, 16, 17, 5, 6, 7, 14, 8, 9, 13, 15, 10, 11, 12],
//         "participants_number": 1
//       },
//       {
//         "id": 8,
//         "name": "a",
//         "priority_list": [4, 1, 2, 16, 17, 3, 5, 6, 7, 8, 14, 15, 9, 10, 11, 13, 12],
//         "participants_number": 1
//       },
//       {
//         "id": 9,
//         "name": "b",
//         "priority_list": [16, 17, 3, 2, 4, 1, 5, 6, 7, 8, 15, 9, 10, 14, 11, 12, 13],
//         "participants_number": 1
//       },
//       {
//         "id": 10,
//         "name": "c",
//         "priority_list": [5, 6, 16, 17, 7, 8, 9, 10, 15, 11, 12, 2, 3, 4, 1, 14, 13],
//         "participants_number": 1
//       },
//       {
//         "id": 11,
//         "name": "d",
//         "priority_list": [5, 6, 16, 17, 7, 8, 9, 10, 11, 15, 12, 4, 1, 2, 3, 13, 14],
//         "participants_number": 1
//       },
//       {
//         "id": 12,
//         "name": "e",
//         "priority_list": [1, 6, 7, 8, 16, 17, 9, 14, 10, 11, 12, 4, 5, 13, 2, 3, 15],
//         "participants_number": 1
//       }
//   ];
//
// createAll(proposers, receivers);
