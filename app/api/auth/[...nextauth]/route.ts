import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email ve şifre gereklidir.");
                }

                const admin = await prisma.admin.findUnique({
                    where: { email: credentials.email }
                });

                if (!admin) {
                    throw new Error("Kullanıcı bulunamadı.");
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, admin.password);

                if (!isPasswordValid) {
                    throw new Error("Hatalı şifre.");
                }

                return {
                    id: admin.id,
                    email: admin.email,
                    role: admin.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
