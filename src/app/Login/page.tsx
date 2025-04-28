"use client";
import { useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { db } from "../../../config";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
const UserForm = ({ onUserCreated }: any) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const docRef = doc(db, "Collage_users", data.username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //   onLoginSuccess(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      toast("User not found! Please check your user ID.");
      alert("User not found! Please check your user ID.");
    }
    // const lastFourDigits = data.mobile.slice(-4);
    // const UId = data.username.replace(/\s/g, "").substring(0, 4).toUpperCase();
    // const userId = `${UId}-${lastFourDigits}-${data.birthYear.split("-")[2]}`;
    // const { username, mobile, birthYear } = data;
    // const userData = {
    //   username,
    //   mobile,
    //   birthYear,
    //   progress: {
    //     currentQuestion: 0,
    //     score: 0,
    //   },
    // };
    // setDoc(doc(db, "Collage_users", userId), userData)
    //   .then(() => {
    //     // onUserCreated(userId);
    //     console.log("Document successfully written!");
    //     toast("User created successfully!");
    //   })
    //   .catch((error) => {
    //     console.error("Error writing document: ", error);
    //     toast("Error creating user!");
    //   });
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8 px-4">
      <Card className="max-w-2/3 min-w-2/6">
        <CardHeader className="w-full text-center">
          <CardTitle className="font-extrabold text-2xl">Login</CardTitle>
          <CardDescription>
            Please enter your UserID. <br />
            Example: <strong>ARPI-8196-2002</strong> <br />
            (First 4 letters of your name - 4 Mobile digits - your birth year)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ARPI-8196-2002" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Start Test</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
