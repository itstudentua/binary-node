import { fightRepository } from "../repositories/fightRepository.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

class FightersService {
  getAllFights() {
    return fightRepository.getAll();
  }

  getFightById(id) {
    return fightRepository.getOne({ id });
  }

  createFight(fighter1Id, fighter2Id) {
    if (fighter1Id === fighter2Id) {
      throw { status: 400, message: "Fighters must be different" };
    }

    const fighter1 = fighterRepository.getOne({ id: fighter1Id });
    const fighter2 = fighterRepository.getOne({ id: fighter2Id });

    if (!fighter1 || !fighter2) {
      throw { status: 404, message: "One or both fighters not found" };
    }

    const fight = {
      id: Date.now().toString(),
      fighter1: fighter1.id,
      fighter2: fighter2.id,
      log: [{
        fighter1Shot: 0,
        fighter2Shot: 0,
        fighter1Health: fighter1.health ?? 85,
        fighter2Health: fighter2.health ?? 85,
      }],
    };

    fightRepository.create(fight);
    return fight;
  }
}
const fightersService = new FightersService();
export { fightersService };
