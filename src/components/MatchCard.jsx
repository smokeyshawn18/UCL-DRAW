import React, { useState, useCallback, useMemo } from "react";
import Win from "../assets/ucl.jpeg";
import LIV from "../assets/logo/liverpool.png";
import PSG from "../assets/logo/psg.png";
import VILLA from "../assets/logo/astonvilla.png";
import BARCA from "../assets/logo/barcelona.png";
import CITY from "../assets/logo/mancity.webp";
import ATLANTA from "../assets/logo/cb.webp";
import JUV from "../assets/logo/psv.webp";
import ARS from "../assets/logo/arsenal.png";
import LEV from "../assets/logo/leverkusen.png";
import LIL from "../assets/logo/lille.png";
import BENFICA from "../assets/logo/benfica.png";
import INTER from "../assets/logo/inter.png";
import MILAN from "../assets/logo/feyenoord.png";
import AMD from "../assets/logo/amadrid.png";
import BAYERN from "../assets/logo/bayern.png";
import DOR from "../assets/logo/dortmund.png";

function MatchCard() {
  const initialTeams = useMemo(
    () => [
      { id: 1, name: "LIVERPOOL", logo: LIV },
      { id: 2, name: "PSG", logo: PSG },
      { id: 3, name: "A. VILLA", logo: VILLA },
      { id: 4, name: "C. Brugge", logo: ATLANTA },
      { id: 5, name: "R. Madrid ", logo: CITY },
      { id: 6, name: "A. Madrid", logo: AMD },
      { id: 7, name: "PSV", logo: JUV },
      { id: 8, name: "ARSENAL", logo: ARS },
      { id: 9, name: "BARCELONA", logo: BARCA },
      { id: 10, name: "BENFICA", logo: BENFICA },
      { id: 11, name: "LILLE", logo: LIL },
      { id: 12, name: "DORTMUND", logo: DOR },
      { id: 13, name: "Leverkusen", logo: LEV },
      { id: 14, name: "BAYERN", logo: BAYERN },
      { id: 15, name: "INTER", logo: INTER },
      { id: 16, name: "Fey", logo: MILAN },
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
  const [selectedTeam, setSelectedTeam] = useState(null);

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

  const UCLMatchCard = useCallback(
    ({ match, round }) => (
      <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center">
          <div
            onClick={() => handleMatchWinner(match.id, match.team1, round)}
            className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-blue-600/30 transition-colors ${
              selectedTeam?.id === match.team1?.id ? "bg-blue-600/50" : ""
            }`}
          >
            {match.team1 ? (
              <>
                <img
                  src={match.team1.logo}
                  alt={match.team1.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white font-semibold text-sm">
                  {match.team1.name}
                </span>
              </>
            ) : (
              <span className="text-gray-400 text-sm">TBD</span>
            )}
          </div>
          <span className="text-gray-300 text-xs">vs</span>
          <div
            onClick={() => handleMatchWinner(match.id, match.team2, round)}
            className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-blue-600/30 transition-colors ${
              selectedTeam?.id === match.team2?.id ? "bg-blue-600/50" : ""
            }`}
          >
            {match.team2 ? (
              <>
                <img
                  src={match.team2.logo}
                  alt={match.team2.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-white font-semibold text-sm">
                  {match.team2.name}
                </span>
              </>
            ) : (
              <span className="text-gray-400 text-sm">TBD</span>
            )}
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-2">
          Match {match.id} | Date TBD
        </div>
      </div>
    ),
    [selectedTeam, handleMatchWinner]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          UEFA Champions League Knockout Stage
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Predict your UCL Winner
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Round of 16 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center text-white bg-blue-800/50 p-2 rounded">
              Round of 16
            </h2>
            {roundOf16.map((match) => (
              <UCLMatchCard key={match.id} match={match} round="roundOf16" />
            ))}
          </div>

          {/* Quarter Finals */}
          <div className="space-y-12 mt-12 lg:mt-24">
            <h2 className="text-xl font-semibold text-center text-white bg-blue-800/50 p-2 rounded">
              Quarter Finals
            </h2>
            {quarterFinals.map((match) => (
              <UCLMatchCard key={match.id} match={match} round="quarter" />
            ))}
          </div>

          {/* Semi Finals */}
          <div className="space-y-24 mt-24 lg:mt-48">
            <h2 className="text-xl font-semibold text-center text-white bg-blue-800/50 p-2 rounded">
              Semi Finals
            </h2>
            {semiFinals.map((match) => (
              <UCLMatchCard key={match.id} match={match} round="semi" />
            ))}
          </div>

          {/* Finals */}
          <div className="space-y-12 mt-48 lg:mt-72">
            <h2 className="text-xl font-semibold text-center text-white bg-blue-800/50 p-2 rounded">
              Final
            </h2>
            {finals.map((match) => (
              <UCLMatchCard key={match.id} match={match} round="final" />
            ))}
            {winner && (
              <div className="text-center mt-12">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  UCL Winner
                </h3>
                <div className="flex justify-center items-center gap-4">
                  <img
                    src={winner.logo}
                    alt={winner.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-white text-xl font-semibold">
                    {winner.name}
                  </span>
                </div>
                <img
                  src={Win}
                  alt="UCL Trophy"
                  className="w-40 h-40 object-contain mt-6 mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
