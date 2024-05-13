import Link from "next/link";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FormProps {
  type: string;
  post: any;
  setPost: any;
  submitting: boolean;
  handleSubmit: any;
}

const formSchema = z.object({
  prompt: z.string().min(20, {
    message: "AI Prompt must be at least 20 characters.",
  }),
  tag: z.string().min(4, { message: "Tag must be at least 2 characters." }),
});

const FormUI = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: FormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      tag: "",
    },
  });

  console.log({ post });

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <div className="w-full grid grid-cols-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-10 mb-10 w-full glassmorphism"
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xl">
                    Enter AI Prompt
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      value={post && post.prompt}
                      onChange={(e) => {
                        setPost({ ...post, prompt: e.target.value });
                        field.onChange(e);
                      }}
                      className="dark:bg-black/30 w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 dark:text-gray-200"
                      placeholder="Write your AI prompt here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-xl">
                    Type of Prompt
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={post && post.tag}
                      onChange={(e) => {
                        setPost({ ...post, tag: e.target.value });
                        field.onChange(e);
                      }}
                      className="dark:bg-black/30 w-full flex rounded-lg h-[50px] mt-2 p-3 text-sm text-gray-500 outline-0 dark:text-gray-200"
                      placeholder="#product, #webdevelopment, #idea..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-x-5 flex justify-end">
              <Button
                variant="outline"
                className="dark:bg-transparent hover:before:bg-redborder-red-500 relative rounded-full px-7 overflow-hidden border-2 dark:border-orange-400 bg-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:text-white hover:shadow-orange-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">Cancel</span>
              </Button>
              <Button
                variant="outline"
                className="dark:bg-transparent hover:before:bg-redborder-red-500 relative rounded-full px-7 overflow-hidden border-2 dark:border-orange-400 bg-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-orange-400 before:transition-all before:duration-500 hover:text-white hover:shadow-orange-400 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10">
                  {submitting ? `${type}ing...` : type}
                </span>
              </Button>
            </div>
          </form>
        </Form>
        <div className="m-auto">
          <Image
            src="/assets/images/form.gif"
            alt="form_image"
            className="object-cover"
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
};

export default FormUI;

//  <form
//    onSubmit={handleSubmit}
//    className="mt-10 mb-25 w-full flex flex-col gap-7 glassmorphism"
//  >
//    <label>
//      <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-200">
//        Your AI Prompt
//      </span>

//      <textarea
//        //value={post.prompt}
//        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
//        placeholder="Write your post here"
//        required
//        className="form_textarea"
//      />
//    </label>

//    <label>
//      <span className="font-satoshi font-semibold text-base text-gray-700 dark:text-gray-200">
//        Field of Prompt{" "}
//        <span className="font-normal">
//          (#product, #webdevelopment, #idea, etc.)
//        </span>
//      </span>
//      <input
//        //value={post.tag}
//        onChange={(e) => setPost({ ...post, tag: e.target.value })}
//        type="text"
//        placeholder="#Tag"
//        required
//        className="form_input"
//      />
//    </label>

//    <div className="flex-end mx-3 mb-5 gap-4">
//      <Link href="/" className="text-gray-500 text-sm dark:text-gray-300">
//        Cancel
//      </Link>

//      <button
//        type="submit"
//        disabled={submitting}
//        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
//      >
//        {submitting ? `${type}ing...` : type}
//      </button>
//    </div>
//  </form>;
