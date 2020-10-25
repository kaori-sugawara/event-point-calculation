import * as z from 'zod';

export type IFormInput = {
  "star3": number;
  "star4": number;
  "star5": number;
  "goal": number;
  "liveScore": number;
  "eventLiveScore": number;
  "bpPerPlay": number;
}

export const schema = z.object({
  star3: z.number(),
  star4: z.number(),
  star5: z.number(),
  goal: z.number(),
  liveScore: z.number()
    .positive({ message: "0以上を入力してください" })
    .int({ message: "整数で入力してください" }),
  eventLiveScore: z.number()
    .positive({ message: "0以上を入力してください" })
    .int({ message: "整数で入力してください" }),
  bpPerPlay: z.number(),
})

export const defaultValues = {
  star3: 0,
  star4: 0,
  star5: 0,
  goal: 350,
  liveScore: 210,
  eventLiveScore: 210,
  bpPerPlay: 10,
}