"use client";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
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
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  mobile: z.string().min(10, {
    message: "Mobile number must be at least 10 characters.",
  }),
  birthYear: z.string().min(4, {
    message: "Birth year must be at least 4 characters.",
  }),
});
const UserForm = ({
  onUserCreated,
}: {
  onUserCreated: (userId: string) => void;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      mobile: "",
      birthYear: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const lastFourDigits = data.mobile.slice(-4);
    const UId = data.username.replace(/\s/g, "").substring(0, 4).toUpperCase();
    const userId = `${UId}-${lastFourDigits}-${data.birthYear.split("-")[2]}`;
    const { username, mobile, birthYear } = data;
    const userData = {
      username,
      mobile,
      birthYear,
      progress: {
        currentQuestion: 0,
        score: 0,
      },
    };
    setDoc(doc(db, "Collage_users", userId), userData)
      .then((ds) => {
        onUserCreated(userId);
        console.log("Document successfully written!");
        toast("User created successfully!");
        // router.push(`/test/${userId}`);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        toast("Error creating user!");
      });
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-8 px-4">
      <Card className="max-w-2/3 min-w-2/5">
        <CardHeader>
          <CardTitle>Aptitude Form</CardTitle>
          <CardDescription>
            {" "}
            Fill in your details to start the test{" "}
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
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="000-000-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Year</FormLabel>
                    <FormControl>
                      <Input placeholder="15-07-2002" {...field} />
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
