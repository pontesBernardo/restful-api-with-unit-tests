import { t } from "elysia";
import { userRepository } from "../repositories/user.repository";

export const userController = {
  me: {
    handler: ({ query, set }: any) => {
      const { email } = query;

      const user = userRepository.findByEmail(email);
      if (!user) {
        set.status = 404;
        return { error: "User not found" };
      }

      return {
        message: "User profile found!",
        data: user,
      };
    },
    query: t.Object({
      email: t.String({ format: "email" }),
    }),
  },
};
