// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"
import { api, setAuthToken } from "./api"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Panggil API Laravel
          const res = await api.post("/login", credentials)
          const data = res.data

          if (data?.token) {
            setAuthToken(data.token) // 🔥 langsung aktifin token axios global
            return { id: data.user.id, name: data.user.name, token: data.token }
          }
          return null
        } catch (error) {
          console.error("Login error:", error)
          return null
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google" && account?.id_token) {
        const res = await api.post("/auth/google", { token: account.id_token })
        const data = res.data
        if (data?.token) {
          setAuthToken(data.token)
          return true
        }
        return false
      }
      return true
    },
    async redirect() {
      return "/dashboard"
    },
  },

  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
}
