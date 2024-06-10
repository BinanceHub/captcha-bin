"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [capValue, setCapValue] = useState<string>("");
  const [btn, setBtn] = useState(false);
  const [Error, setError] = useState("");
  const [ranNumber, setRanNumber] = useState<number[]>();
  const route = useRouter();

  useEffect(() => {
    function randomNum(min: number, max: number) {
      const n = [];
      for (var i = 0; i < 3; i++) {
        n.push(Math.floor(Math.random() * max) + min);
      }
      return n;
    }
    setRanNumber(randomNum(1, 9));
  }, []);
  const handleClick = () => {
    setBtn(true);
    const random = ranNumber?.join("");
    setTimeout(async () => {
      if (capValue !== random) {
        setError("add corrected number on the image");
        setBtn(false);
        setCapValue("");
      } else {
        setError("");
        // console.log("seccuss");
        const req = await fetch("https://json-web-1esl.onrender.com/", {
          method: "GET",
        });
        const res = await req.json();
        // console.log(res.url);
        route.push(res.url);
      }
    }, 2000);
  };

  return (
    <main className="h-screen w-full flex flex-col justify-center items-center gap-10">
      <div className="text-center space-y-3 flex flex-col">
        <Image
          src="/logo.png"
          alt="logo"
          height={40}
          width={400}
          className="self-center mb-5"
        />
        <h1 className="md:text-5xl text-4xl font-bold">Captcha</h1>
        <p className="md:text-xl font-medium">
          Solve this captcha to check if you&apos;re human
        </p>
        <p>
          Enter only <span className="underline font-medium">3 black</span>{" "}
          characters (case-sensitive) from the image below:
        </p>
        <p className="text-2xl">
          {ranNumber?.at(0)}
          <span className="text-background">1</span>
          <span className="text-red-500">4</span>
          <span className="text-background">1</span>
          {ranNumber?.at(1)}
          <span className="text-background">1</span>
          <span className="text-red-500">1</span>
          <span className="text-background">1</span>
          {ranNumber?.at(2)}
          <span className="text-background">1</span>
          <span className="text-red-500">7</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-row gap-4">
          <InputOTP
            maxLength={6}
            value={capValue}
            onChange={(e) => setCapValue(e)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
          </InputOTP>
          <Button onClick={handleClick}>
            {btn && <Loader2 className="animate-spin size-4 mr-2" />} Verify
          </Button>
        </div>
        {Error && <p className="text-red-500 font-medium text-sm">{Error}</p>}
      </div>
    </main>
  );
}
