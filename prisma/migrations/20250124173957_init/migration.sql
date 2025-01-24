-- CreateTable
CREATE TABLE "QuizResult" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "scores" JSONB NOT NULL,
    "deviceId" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionResponse" (
    "id" TEXT NOT NULL,
    "quizResultId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,
    "ruleType" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "QuestionResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuizResult_createdAt_idx" ON "QuizResult"("createdAt");

-- CreateIndex
CREATE INDEX "QuestionResponse_ruleType_idx" ON "QuestionResponse"("ruleType");

-- CreateIndex
CREATE INDEX "QuestionResponse_quizResultId_idx" ON "QuestionResponse"("quizResultId");

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_quizResultId_fkey" FOREIGN KEY ("quizResultId") REFERENCES "QuizResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
