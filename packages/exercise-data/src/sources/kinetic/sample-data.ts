// Curated Sample Dataset from Kinetic Exercises DB (MIT License)
import { KineticRawExercise } from './types';

export const kineticSampleExercises: KineticRawExercise[] = [
  {
    id: "kinetic-push-up",
    name: "Push Up",
    target: "pectorals",
    bodyPart: "chest",
    equipment: "body weight",
    secondaryMuscles: ["triceps", "deltoids", "abdominals"],
    instructions: [
      "Place your hands shoulder-width apart on the floor.",
      "Maintain a straight line from heels to head.",
      "Lower your chest until elbows reach 90 degrees.",
      "Push forcefully back to full arm extension."
    ]
  },
  {
    id: "kinetic-pull-up",
    name: "Pull Up",
    target: "lats",
    bodyPart: "back",
    equipment: "pull-up bar",
    secondaryMuscles: ["biceps", "middle back", "forearms"],
    instructions: [
      "Grasp the bar with an overhand grip slightly wider than shoulders.",
      "Hang with arms fully extended.",
      "Pull yourself upward until your chin clears the bar.",
      "Lower with control back to dead hang."
    ]
  },
  {
    id: "kinetic-bodyweight-squat",
    name: "Bodyweight Squat",
    target: "quads",
    bodyPart: "upper legs",
    equipment: "body weight",
    secondaryMuscles: ["glutes", "calves", "hamstrings"],
    instructions: [
      "Stand with feet shoulder-width apart, toes slightly turned out.",
      "Hinge at hips and bend knees downward.",
      "Descend until thigh is parallel to ground.",
      "Drive through mid-foot to stand upright."
    ]
  },
  {
    id: "kinetic-diamond-push-up",
    name: "Diamond Push Up",
    target: "triceps",
    bodyPart: "arms",
    equipment: "body weight",
    secondaryMuscles: ["pectorals", "deltoids"],
    instructions: [
      "Assume push-up position with thumbs and index fingers touching under chest.",
      "Lower chest slowly toward the hands.",
      "Press through triceps back to starting position."
    ]
  },
  {
    id: "kinetic-crunch",
    name: "Standard Crunch",
    target: "abdominals",
    bodyPart: "waist",
    equipment: "body weight",
    secondaryMuscles: ["obliques"],
    instructions: [
      "Lie supine with knees bent and feet flat.",
      "Contract abdominal wall to curl ribcage toward hips.",
      "Lower back with control."
    ]
  },
  {
    id: "kinetic-dips",
    name: "Parallel Bar Dips",
    target: "triceps",
    bodyPart: "arms",
    equipment: "parallel bars",
    secondaryMuscles: ["pectorals", "deltoids"],
    instructions: [
      "Support yourself on parallel bars with straight arms.",
      "Lower body by bending elbows until shoulders reach 90 degrees.",
      "Push upward to lockout."
    ]
  },
  {
    id: "kinetic-pike-push-up",
    name: "Pike Push Up",
    target: "deltoids",
    bodyPart: "shoulders",
    equipment: "body weight",
    secondaryMuscles: ["triceps", "upper back"],
    instructions: [
      "Form an inverted V-shape with hips high in the air.",
      "Lower crown of head diagonally forward between hands.",
      "Press through shoulders back to inverted V."
    ]
  },
  {
    id: "kinetic-glute-bridge",
    name: "Glute Bridge",
    target: "glutes",
    bodyPart: "upper legs",
    equipment: "body weight",
    secondaryMuscles: ["hamstrings", "lower back"],
    instructions: [
      "Lie supine with knees bent, feet flat on the floor.",
      "Drive through heels to lift hips until thighs and torso align.",
      "Squeeze glutes at top and lower slowly."
    ]
  }
];
