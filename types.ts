
export interface JobDescription {
  title: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  cultureAndBenefits: string[];
}

export interface InterviewQuestion {
  question: string;
  targetSkill: string;
  rationale: string;
}

export interface RecruitmentOutput {
  jobDescription: JobDescription;
  interviewGuide: InterviewQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
