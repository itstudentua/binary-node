import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    return userRepository.getAll();
  }

  getById(id) {
    return userRepository.getOne({ id });
  }

  create(data) {
    const users = userRepository.getAll();
    const emailExists = users.some(u => u.email.toLowerCase() === data.email.toLowerCase());
    const phoneExists = users.some(u => u.phone === data.phone);

    if (emailExists) {
      throw { status: 400, message: "Email already exists" };
    }
    if (phoneExists) {
      throw { status: 400, message: "Phone already exists" };
    }

    const user = {
      ...data,
      id: Date.now().toString()
    };

    userRepository.create(user);
    return user;
  }

  update(id, data) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    const updated = { ...user, ...data };
    userRepository.update(id, updated);
    return updated;
  }

  delete(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    userRepository.delete(id);
    return { message: "User deleted successfully" };
  }

  search(search) {
    return userRepository.getOne(search) || null;
  }
}

const userService = new UserService();
export { userService };
