import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Quiz {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: number;
  time: number;
  icon: string;
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'Основы JavaScript',
    description: 'Проверьте свои знания основных концепций JS',
    category: 'Программирование',
    difficulty: 'easy',
    questions: 15,
    time: 10,
    icon: 'Code'
  },
  {
    id: 2,
    title: 'React и Hooks',
    description: 'Тест на знание современного React',
    category: 'Программирование',
    difficulty: 'medium',
    questions: 20,
    time: 15,
    icon: 'Atom'
  },
  {
    id: 3,
    title: 'Математика: Алгебра',
    description: 'Квадратные уравнения и системы',
    category: 'Математика',
    difficulty: 'medium',
    questions: 12,
    time: 20,
    icon: 'Calculator'
  },
  {
    id: 4,
    title: 'История России',
    description: 'От Киевской Руси до современности',
    category: 'История',
    difficulty: 'hard',
    questions: 25,
    time: 30,
    icon: 'BookOpen'
  },
  {
    id: 5,
    title: 'Английский: Грамматика',
    description: 'Времена и структуры предложений',
    category: 'Языки',
    difficulty: 'easy',
    questions: 18,
    time: 12,
    icon: 'Languages'
  },
  {
    id: 6,
    title: 'Физика: Механика',
    description: 'Законы Ньютона и движение тел',
    category: 'Наука',
    difficulty: 'hard',
    questions: 15,
    time: 25,
    icon: 'Zap'
  }
];

const categories = ['Все', 'Программирование', 'Математика', 'История', 'Языки', 'Наука'];

const difficultyColors = {
  easy: 'bg-green-100 text-green-700 hover:bg-green-200',
  medium: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
  hard: 'bg-red-100 text-red-700 hover:bg-red-200'
};

const difficultyLabels = {
  easy: 'Легко',
  medium: 'Средне',
  hard: 'Сложно'
};

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const filteredQuizzes = quizzes.filter(quiz => {
    const categoryMatch = selectedCategory === 'Все' || quiz.category === selectedCategory;
    const difficultyMatch = !selectedDifficulty || quiz.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="text-6xl">🎯</div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--coral))] via-[hsl(var(--accent))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
            Платформа Тестирования
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Проверьте свои знания в различных областях. Выбирайте тесты по категориям и уровню сложности
          </p>
        </header>

        <div className="mb-12 space-y-6">
          <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category 
                    ? 'bg-gradient-to-r from-[hsl(var(--coral))] to-[hsl(var(--accent))] shadow-lg' 
                    : ''
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
            <Button
              variant={!selectedDifficulty ? 'default' : 'outline'}
              onClick={() => setSelectedDifficulty(null)}
              size="sm"
            >
              Все уровни
            </Button>
            {Object.entries(difficultyLabels).map(([key, label]) => (
              <Button
                key={key}
                variant="outline"
                size="sm"
                onClick={() => setSelectedDifficulty(key)}
                className={selectedDifficulty === key ? difficultyColors[key as keyof typeof difficultyColors] : ''}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz, index) => (
            <Card 
              key={quiz.id} 
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--coral))] to-[hsl(var(--accent))] flex items-center justify-center text-white shadow-lg">
                  <Icon name={quiz.icon} size={24} />
                </div>
                <Badge className={difficultyColors[quiz.difficulty]}>
                  {difficultyLabels[quiz.difficulty]}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{quiz.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Icon name="FileQuestion" size={16} />
                  <span>{quiz.questions} вопросов</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={16} />
                  <span>{quiz.time} мин</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {quiz.category}
                </Badge>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-[hsl(var(--secondary))] to-[hsl(var(--mint))] hover:shadow-lg transition-all"
                >
                  Начать тест
                  <Icon name="ArrowRight" size={16} className="ml-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredQuizzes.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">Тесты не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить фильтры</p>
          </div>
        )}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--coral))]/10 to-[hsl(var(--coral))]/5">
            <div className="text-4xl mb-3">📊</div>
            <h4 className="font-semibold text-lg mb-2">Отслеживайте прогресс</h4>
            <p className="text-sm text-muted-foreground">Смотрите статистику и улучшайте результаты</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--accent))]/10 to-[hsl(var(--accent))]/5">
            <div className="text-4xl mb-3">🎓</div>
            <h4 className="font-semibold text-lg mb-2">Учитесь эффективно</h4>
            <p className="text-sm text-muted-foreground">Материалы подобраны экспертами</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[hsl(var(--secondary))]/10 to-[hsl(var(--secondary))]/5">
            <div className="text-4xl mb-3">⚡</div>
            <h4 className="font-semibold text-lg mb-2">Быстрая проверка</h4>
            <p className="text-sm text-muted-foreground">Мгновенные результаты после теста</p>
          </div>
        </div>
      </div>
    </div>
  );
}
