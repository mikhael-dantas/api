const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const secret = 'asdfghjklç';


const scriptLoop = () => {
  //! football studio
  const LSNumberConstant = "LSNumberConstant";
  const LSAPICount = "LSAPICount";
  const LSAPILastTrigger = "LSAPILastTrigger";
  const LSSessionId = "LSSessionId";

  const clickInactivity = () => {
      setInterval(function() {
          let clickableElement = document.querySelector('.clickable--394a7');
          if (clickableElement) {
              clickableElement.click();
          }
      }, 21000); // 21000 milliseconds = 21 seconds
  }
  const popUpFn = (error) => {
    (function() {
        const div = document.createElement('div');
        div.textContent = 'aksdjskjkd';
        div.style.position = 'absolute';
        div.style.top = '10px';
        div.style.right = '10px';
        div.style.padding = '10px';
        div.style.borderRadius = '10px';
        div.style.backgroundColor = error ? 'red' : 'green';
        div.style.color = 'white';
        div.style.fontSize = '16px';
        div.style.zIndex = '1000';
        document.body.appendChild(div);
      })();
    }
  const getLetters = () => {
      const letterElements = document.querySelectorAll('.historyStatistic--c80d3 .historyItem--a1907 text');
      const letters = Array.from(letterElements).map(element => element.textContent);

      if (letters.length < 27) {
        popUpFn(true);
      } else {
        popUpFn(false);
      }

  
      console.log(letters);
      return letters.join("");
  }
  
  const clearLocalStorage = () => {
      localStorage.removeItem(LSNumberConstant);
  }

  const concatToLocalStorage = () => {
      const max500lastLetters = localStorage.getItem(LSNumberConstant) || "";
      const the27letters = getLetters();
      if (!max500lastLetters) {
          localStorage.setItem(LSNumberConstant, the27letters);
          return
      }

      // at least 15 letters must match to concat at the exact place, cause its a loop interval
      const the15lettersPieceToMatch = the27letters.slice(12, 27);
      const pieceToCompare = max500lastLetters.slice(0, 27);
      const result = pieceToCompare.split(the15lettersPieceToMatch);
      const matched = result.length > 1;
      if (!matched) {
          localStorage.setItem(LSNumberConstant, the27letters);
      }
      const concat = the27letters + (result.splice(1, result.length - 1)).join(the15lettersPieceToMatch);
      localStorage.setItem(LSNumberConstant, concat);
  }

  //! universal
  const patterns = {
      repete: {
          name: "Padrão 10 - Espelhamento",
          pattern: [
              "vvvvvv",
              "vvcvvc",
              "vccvcc",
              "vcvvcv",
              "cvvcvv",
              "cvccvc",
              "ccvccv",
              "cccccc",
          ],
          rule: (pattern) => {
              return pattern[pattern.length - 1];
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197233455599676/WhatsApp_Image_2023-11-03_at_13.44.23.jpeg?ex=65616499&is=654eef99&hm=a5bc0b654bd27d1608292c7c971d21fabd3b6a8b59867dbb649d1b4d52aa49e4&",
          alert: "Alta tendência de empate!"
      },
      treetree: {
          name: "Padrão 8: 3 para 3",
          pattern: [
              "vvvccc",
              "cccvvv"
          ],
          rule: (pattern) => {
              return pattern[pattern.length - 1];
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197233786966046/WhatsApp_Image_2023-11-03_at_13.44.23_8.jpeg?ex=65616499&is=654eef99&hm=42a47758de4f7e391e569c5116ac60b1b8af3ce15895b6ace9f97f4949a17c18&",
      },
      check: {
          name: "Padrão 4: Xeque mate",
          pattern: [
              "cvcvv",
              "vcvcc"
          ],
          rule: (pattern) => {
              return pattern[0];
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197234076364860/WhatsApp_Image_2023-11-03_at_13.44.23_7.jpeg?ex=65616499&is=654eef99&hm=c65bce04cc3699c85403bc015e5df498a409b62460c868bbeeff3b6d08e24b73&",
          alert: "Alta tendência de empate!"
      },
      pique: {
          name: "Padrão 9: Mantém o Pique",
          pattern: [
              "vvcvcvccccccv",
              "ccvcvcvvvvvvc"
          ],
          rule: (pattern) => {
              return pattern[2];
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197234420289616/WhatsApp_Image_2023-11-03_at_13.44.23_6.jpeg?ex=65616499&is=654eef99&hm=53578d36cb06561eb129cff2b3e7e222afea067675c29682c8a158f92a07877f&",
      },
      wave: {
          name: "PAdrão 2: Onda",
          pattern: [
              "cccccc",
              "vvvvvv"
          ],
          rule: (pattern) => {
              return pattern[0] === "c" ? "v" : "c";
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197234755850332/WhatsApp_Image_2023-11-03_at_13.44.23_5.jpeg?ex=65616499&is=654eef99&hm=65edc057c3efc3e0e5f1e2c6093121a8af283e2082b9d19de3c45e7bdc745e68&"
      },
      chess: {
          name: "Padrão 3: Xadrez",
          pattern: [
              "vcvv",
              "cvcc"
          ],
          rule: (pattern) => {
              return pattern[1];
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197235372404827/WhatsApp_Image_2023-11-03_at_13.44.23_4.jpeg?ex=6561649a&is=654eef9a&hm=a3f0819feb251aebc835cf008c496c286eb8dd141437d2a5ba577936d948c032&"
      },
      twoToTwo: {
          name: "Padrão 5: 2 para 2",
          pattern: [
              "vvcc",
              "ccvv"
          ],
          rule: (pattern) => {
              return pattern[pattern.length - 1];
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197235737317426/WhatsApp_Image_2023-11-03_at_13.44.23_3.jpeg?ex=6561649a&is=654eef9a&hm=eef9465d4eab1e46bf330c9069d9b347dff66e83f44ab25d2e7448ebe4fc8a4e&",
          alert: "Alta tendência de empate!"
      },
      twoToTwoBreak: {
          name: "Padrão 6: Quebra do 2 para 2",
          pattern: [
              "cvvcc",
              "vccvv"
          ],
          rule: (pattern) => {
              return pattern[1];
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197236026716301/WhatsApp_Image_2023-11-03_at_13.44.23_2.jpeg?ex=6561649a&is=654eef9a&hm=10b676360c8f5d262023871bf5b198dbf9906c56e9bf71039cc651e6d0081248&",
          alert: "Alta tendência de empate!"
      },
      surf: {
          name: "Padrão 1: Surf",
          pattern: [
              "cvvvvvv",
              "vcccccc"
          ],
          rule: (pattern) => {
              return pattern[1];
          },
          url: "https://cdn.discordapp.com/attachments/1098482108424519712/1170197236307726486/WhatsApp_Image_2023-11-03_at_13.44.23_1.jpeg?ex=6561649a&is=654eef9a&hm=3a21522ebda03cf4fcba6d6e402e8bcef9ea68bc6171b19474cc79050546d2e5&"
      }
  }
  
  const triggerPattern = (sequence27chars) => {
      sequence27chars = sequence27chars.toLowerCase()
      // substitute all the non c and v letters for ""
      sequence27chars = sequence27chars.replace(/[^cv]/g, "");
      const patternsArray = Object.values(patterns);
      const patternsOrdered = patternsArray.sort((b, a) => {
          return b.pattern[0].length - a.pattern[0].length;
      });
  
      for (const pattern of patternsOrdered) {
          const patternArray = pattern.pattern;
          const length = patternArray[0].length;
          const sequence = sequence27chars.slice(0, length);
  
          if (patternArray.includes(sequence)) {
              return [pattern, sequence];
          }
      }
  
      return [false, ""];
  }

  function main () {
      clearLocalStorage();
      clickInactivity();

      setInterval(function() {
          concatToLocalStorage();
          const sequence27chars = localStorage.getItem(LSNumberConstant);
          const [pattern, sequence] = triggerPattern(sequence27chars);
          if (pattern) {
              const count = localStorage.getItem(LSAPICount) || "0"
              const lastTrigger = localStorage.getItem(LSAPILastTrigger) || ""

              if (lastTrigger === pattern.name && count >= "5") {
                  return
              } 

              localStorage.setItem(LSAPICount, (parseInt(count) + 1).toString());
              localStorage.setItem(LSAPILastTrigger, pattern.name);

              const sessionId = localStorage.getItem(LSSessionId);

              const bodydata = JSON.stringify({patternData: pattern, sequence: sequence});
              fetch("http://localhost:3000/trigger/" + sessionId, {
                  "headers": {
                      "accept": "application/json, text/plain, */*",
                      "Content-Type": "application/json"
                  },
                  method: "POST",
                  "body": bodydata,
                }).catch(error => {
                    console.log(error);
                });
              }
      }, 1000);
  }

  main();
}


const users = [
    {
        id: '1',
        role: 'admin',
        name: 'admin', 
        email: 'admin@dinhu.com',
        password: 'dinhu123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '2',
        role: 'user',
        name: 'visitante', 
        email: 'visitante@dinhu.com',
        password: 'dinhu123',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '3',
        role: 'user',
        name: 'teste',
        email: 'teste@teste.com',
        password: 'dinhu123',
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ]

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allowing all origins for CORS here
    methods: ["GET", "POST"]
  }
});

// Middleware for token validation (Dummy example)
const validateToken = (socket, next) => {
  const token = socket.handshake.query.token;
  try {
    
      const verified = jwt.verify(token, secret);
        const user = users.find(user => user.name === verified.name && user.email === verified.email);
        if (!user || !user.active) {
            return next(new Error("Usuário não ativo"));
        }
        if (verified) {
        return next();
      }
      return next(new Error("Usuário não ativo"));
  } catch (error) {
    return next(new Error("Usuário não ativo"));
  }
};

io.use(validateToken);

// Setting up a connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Enable CORS for all origins
app.use(cors());

// Define the /potato route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

 

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        return res.status(400).json({ error: 'Usuário ou senha incorretos' });
        }

    const token = jwt.sign({ role: user.role, name: user.name, email: user.email }, secret);

    return res.json({ token });
});

app.post('/auth', (req, res) => {
    const { token } = req.body;

    try {
        const verified = jwt.verify(token, secret);
        const user = users.find(user => user.name === verified.name && user.email === verified.email);
        if (!user || !user.active) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
    }   catch (err) {
        return res.status(400).json({ error: 'Token inválido' });
    }
});

app.post('/users', (req, res) => {
    const { token } = req.body;

    try {
        const verified = jwt.verify(token, secret);
        const user = users.find(user => user.name === verified.name && user.email === verified.email);
        if (!user || !user.active) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }
        if (user.role !== 'admin') {
            return res.status(400).json({ error: 'Usuário não autorizado' });
        }
        return res.json({items: users});
    }   catch (err) {
        return res.status(400).json({ error: 'Token inválido' });
    }
})

app.post('/trigger/:connectionId', (req, res) => {
  const { connectionId } = req.params;
  const { patternData, sequence, token } = req.body;

    // Validate token logic here
  console.log(patternData, sequence);
  patternData.sequence = sequence;

  // Check if the connectionId is valid and the client is connected
  if (io.sockets.sockets.has(connectionId)) {
    io.to(connectionId).emit('trigger', patternData);
    res.send('Trigger route called!');
  } else {
    // Handle the invalid connectionId case
    res.status(400).send('Invalid connection ID');
  }
});
app.post('/active-sessions', (req, res) => {
    const activeSessions = Array.from(io.sockets.sockets.keys()).length;
    res.json({ activeSessions });
  });
  
// io.to(connectionId).emit('chicken', 'Chicken event triggered!');
// ... [rest of your server logic]


// Start the server

// Define the /hello route
app.get('/cassino', (req, res) => {
  res.send('(' + scriptLoop.toString() + ')()');
});

app.get('/hello', (req, res) => {
  res.send('Hello!');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
