import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  getById(id) {
    return fighterRepository.getOne({ id });
  }

  create(data) {
    const fighters = fighterRepository.getAll();
    const nameExists = fighters.some(
      (f) => f.name.toLowerCase() === data.name.toLowerCase()
    );

    if (nameExists) {
      throw { status: 400, message: "Fighter with this name already exists" };
    }

    const fighter = {
      id: Date.now().toString(),
      health: 85,
      ...data,
    };

    if (fighter.health === undefined) {
      fighter.health = 85;
    }

    fighterRepository.create(fighter);
    return fighter;
  }

  update(id, data) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw { status: 404, message: "Fighter not found" };
    }

    // Якщо оновлюється name — перевіряємо, чи немає іншого бійця з таким name
    if (data.name) {
      const fighters = fighterRepository.getAll();
      const nameExists = fighters.some(
        (f) =>
          f.id !== id && f.name.toLowerCase() === data.name.toLowerCase()
      );

      if (nameExists) {
        throw {
          status: 400,
          message: "Another fighter with this name already exists",
        };
      }
    }

    const updated = { ...fighter, ...data };
    fighterRepository.update(id, updated);
    return updated;
  }

  delete(id) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw { status: 404, message: "Fighter not found" };
    }

    fighterRepository.delete(id);
    return { message: "Fighter deleted successfully" };
  }
}

const fighterService = new FighterService();
export { fighterService };
