"use client"
import React from 'react';
import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form";
import {useRouter} from "next/navigation"
import {useSession} from "next-auth/react"
import {Input} from "./ui/input"
import {Button} from "@/app/components/ui/button";

const FormSchema = z.object({
    topic: z.string(),
    description: z.string(),
    preferredSolution: z.string()
})

function toSentenceCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


const toastNotifySuccess = () =>
    toast.success("Form submitted!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });

const toastNotifyFailed = () =>
    toast.success("Form submission failed!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
    });

const OtherServiceForm = () => {
    const {data: session} = useSession();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            topic: "",
            description: "",
            preferredSolution: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const serviceResponse = await fetch("/api/otherServices", {
            method: "GET"
        });

        const servicesData = await serviceResponse.json();
        const length = servicesData.length;

        const response = await fetch(`/api/otherServices`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: length + 1,
                username: session?.user?.username,
                topic: toSentenceCase(values.topic),
                description: toSentenceCase(values.description),
                preferredSolution: toSentenceCase(values.preferredSolution),
                resolved: false
            })
        })
        if (response.ok) {
            alert("Form submitted!")
            router.push(`/`)
        } else {
            alert("Form submission failed!")
        }
    }
    return (
        <>
            <div className="relative flex flex-col items-center justify-center  overflow-hidden">
                <div className="w-full p-6 bg-gray-700 rounded-md shadow-md lg:max-w-xl">
                    <h1 className="text-3xl font-bold text-center text-white mb-4">Other services form</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full"}>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="topic"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Topic</FormLabel>
                                            <FormControl>
                                                <Input placeholder="What's on your mind?" {...field} className={"text-black"}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Description</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Can you tell us more?" {...field} className={"text-black"}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="preferredSolution"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="font-inter">Preferred Solution</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Do you have any solution in mind? It's okay if you don't have any. Just type -" {...field} className={"text-black"}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-8">
                                <Button type="submit"
                                        className="font-inter w-full px-4 py-6 tracking-wide text-white transition-colors duration-200 transform bg-orange-400 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-gray-600 text-md">Submit</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default OtherServiceForm;