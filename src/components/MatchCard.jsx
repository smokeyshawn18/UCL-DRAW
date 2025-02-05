import React, { useState, useCallback, useMemo } from "react";

import Win from "../assets/ucl.jpeg";
import Round from "./Round";

function MatchCard() {
  const initialTeams = useMemo(
    () => [
      { id: 1, name: "LIVERPOOL", logo: "/src/assets/logo/liverpool.png" },
      { id: 2, name: "PSG", logo: "/src/assets/logo/psg.png" },
      { id: 3, name: "ASTON VILLA", logo: "/src/assets/logo/astonvilla.png" },
      { id: 4, name: "ATALANTA", logo: "/src/assets/logo/atlanta.png" },
      { id: 5, name: "MAN CITY", logo: "/src/assets/logo/mancity.png" },
      { id: 6, name: "LEVERKUSEN", logo: "/src/assets/logo/leverkusen.png" },
      { id: 7, name: "JUVENTUS", logo: "/src/assets/logo/juventus.png" },
      { id: 8, name: "ARSENAL", logo: "/src/assets/logo/arsenal.png" },
      { id: 9, name: "BARCELONA", logo: "/src/assets/logo/barcelona.png" },
      { id: 10, name: "BENFICA", logo: "/src/assets/logo/benfica.png" },
      { id: 11, name: "LILLE", logo: "/src/assets/logo/lille.png" },
      { id: 12, name: "DORTMUND", logo: "/src/assets/logo/dortmund.png" },
      { id: 13, name: "ATLETICO MADRID", logo: "/src/assets/logo/amadrid.png" },
      { id: 14, name: "BAYERN MÜNCHEN", logo: "/src/assets/logo/bayern.png" },
      { id: 15, name: "INTER", logo: "/src/assets/logo/inter.png" },
      { id: 16, name: "MILAN", logo: "/src/assets/logo/milan.png" },
      // ... rest of the teams
    ],
    []
  );

  const [roundOf16, setRoundOf16] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      team1: initialTeams[i * 2],
      team2: initialTeams[i * 2 + 1],
    }))
  );

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [quarterFinals, setQuarterFinals] = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i + 9,
      team1: null,
      team2: null,
    }))
  );
  const [semiFinals, setSemiFinals] = useState(() =>
    Array.from({ length: 2 }, (_, i) => ({
      id: i + 13,
      team1: null,
      team2: null,
    }))
  );
  const [finals, setFinals] = useState([{ id: 15, team1: null, team2: null }]);
  const [winner, setWinner] = useState(null);

  const handleMatchWinner = useCallback((matchId, winningTeam, round) => {
    if (!winningTeam) return;
    setSelectedTeam(winningTeam);

    const updateBracket = {
      roundOf16: (matchId) => {
        const matchIndex = Math.floor((matchId - 1) / 2);
        const isFirstTeam = matchId % 2 !== 0;
        setQuarterFinals((prev) => {
          const newBracket = [...prev];
          newBracket[matchIndex] = {
            ...newBracket[matchIndex],
            [isFirstTeam ? "team1" : "team2"]: winningTeam,
          };
          return newBracket;
        });
      },
      quarter: (matchId) => {
        const matchIndex = Math.floor((matchId - 9) / 2);
        const isFirstTeam = (matchId - 9) % 2 === 0;
        setSemiFinals((prev) => {
          const newBracket = [...prev];
          newBracket[matchIndex] = {
            ...newBracket[matchIndex],
            [isFirstTeam ? "team1" : "team2"]: winningTeam,
          };
          return newBracket;
        });
      },
      semi: (matchId) => {
        const isFirstTeam = matchId === 13;
        setFinals((prev) => [
          {
            ...prev[0],
            [isFirstTeam ? "team1" : "team2"]: winningTeam,
          },
        ]);
      },
      final: () => setWinner(winningTeam),
    };

    updateBracket[round]?.(matchId);
  }, []);

  const MatchCard = useCallback(
    ({ match, round }) => (
      <div className="flex flex-col gap-2 bg-white/5 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
        {[1, 2].map((teamNum) => (
          <React.Fragment key={teamNum}>
            <div
              onClick={() =>
                handleMatchWinner(match.id, match[`team${teamNum}`], round)
              }
              className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-blue-500/20 transition-colors
              ${
                selectedTeam?.id === match[`team${teamNum}`]?.id
                  ? "bg-blue-500/20"
                  : ""
              }`}
            >
              {match[`team${teamNum}`] ? (
                <>
                  <img
                    src={match[`team${teamNum}`].logo}
                    alt={match[`team${teamNum}`].name}
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                  <span className="text-white text-sm sm:text-base font-bold">
                    {match[`team${teamNum}`].name}
                  </span>
                </>
              ) : (
                <span className="text-gray-400 text-sm sm:text-base">TBD</span>
              )}
            </div>
            {teamNum === 1 && (
              <div className="text-center text-xs sm:text-sm text-gray-100">
                VS
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    ),
    [selectedTeam, handleMatchWinner]
  );

  return (
    <div className="min-h-screen bg-[#020617] bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <Round />
        <p className="text-center text-white font-semibold text-base mb-4">
          Predict your winner
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 ">
          {/* Bracket sections */}
          {[
            { title: "Round of 16", matches: roundOf16, round: "roundOf16" },
            {
              title: "Quarter Finals",
              matches: quarterFinals,
              round: "quarter",
            },
            { title: "Semi Finals", matches: semiFinals, round: "semi" },
            { title: "Finals", matches: finals, round: "final" },
          ].map((section, index) => (
            <div
              key={section.title}
              className={`space-y-4 sm:space-y-8 ${
                index > 0 ? "mt-8 sm:mt-16" : ""
              }`}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-center text-white mb-4">
                {section.title}
              </h2>
              {section.matches.map((match) => (
                <MatchCard key={match.id} match={match} round={section.round} />
              ))}
              {section.title === "Finals" && winner && (
                <div className="text-center mt-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
                    Winner
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={winner.logo}
                      alt={winner.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                    />
                    <span className="text-white text-lg sm:text-xl">
                      {winner.name}
                    </span>
                  </div>
                  <img
                    src={Win}
                    alt="winner"
                    className="w-32 h-32 sm:w-50 sm:h-50 object-contain mt-4 mx-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
