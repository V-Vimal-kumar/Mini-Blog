import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export const authOptions = {
  providers: [
    Credentials({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const [rows] = await pool.query(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );

        if (rows.length === 0) return null;

        const user = rows[0];

        const valid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );

        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = user.role;
    }
    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id;
    session.user.role = token.role;
    return session;
  },
},


  pages: {
    signIn: "/login",
  },
};
