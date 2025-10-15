<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">关于我</h1>
        <p class="text-lg text-gray-600">了解更多关于我的故事</p>
      </div>

      <div v-if="profile" class="space-y-12">
        <!-- 个人简介卡片 -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="md:flex">
            <!-- 头像部分 -->
            <div class="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white text-center">
              <div class="mb-6">
                <img
                  :src="profile.avatar"
                  :alt="profile.name"
                  class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                <h2 class="text-2xl font-bold">{{ profile.name }}</h2>
                <p class="text-blue-100">{{ profile.title }}</p>
              </div>
              
              <!-- 社交链接 -->
              <div class="flex justify-center space-x-4">
                <a
                  v-if="profile.social?.github"
                  :href="profile.social.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-white hover:text-blue-200 transition-colors"
                  title="GitHub"
                >
                  <Github class="w-6 h-6" />
                </a>
                <a
                  v-if="profile.social?.twitter"
                  :href="profile.social.twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-white hover:text-blue-200 transition-colors"
                  title="Twitter"
                >
                  <Twitter class="w-6 h-6" />
                </a>
                <a
                  v-if="profile.social?.linkedin"
                  :href="profile.social.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-white hover:text-blue-200 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin class="w-6 h-6" />
                </a>
                <a
                  v-if="profile.social?.weibo"
                  :href="profile.social.weibo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-white hover:text-blue-200 transition-colors"
                  title="微博"
                >
                  <Globe class="w-6 h-6" />
                </a>
              </div>
            </div>

            <!-- 基本信息 -->
            <div class="md:w-2/3 p-8">
              <div class="space-y-6">
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">个人简介</h3>
                  <p class="text-gray-600 leading-relaxed">{{ profile.bio }}</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">联系方式</h3>
                  <div class="space-y-2">
                    <div class="flex items-center text-gray-600">
                      <Mail class="w-5 h-5 mr-3 text-gray-400" />
                      <a :href="`mailto:${profile.email}`" class="hover:text-blue-600 transition-colors">
                        {{ profile.email }}
                      </a>
                    </div>
                    <div class="flex items-center text-gray-600">
                      <MapPin class="w-5 h-5 mr-3 text-gray-400" />
                      <span>{{ profile.location }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">专业领域</h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="area in profile.expertise"
                      :key="area"
                      class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {{ area }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 技能部分 -->
        <section class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">技能专长</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="skill in profile.skills"
              :key="skill.name"
              class="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <component :is="getSkillIcon(skill.category)" class="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">{{ skill.name }}</h3>
                  <p class="text-sm text-gray-600">{{ skill.category }}</p>
                </div>
              </div>
              
              <div class="mb-2">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>熟练度</span>
                  <span>{{ skill.level }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${skill.level}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 工作经历 -->
        <section class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">工作经历</h2>
          <div class="space-y-8">
            <div
              v-for="(experience, index) in profile.experience"
              :key="index"
              class="relative pl-8 border-l-2 border-blue-200 last:border-l-0"
            >
              <div class="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ experience.position }}</h3>
                    <p class="text-blue-600 font-medium">{{ experience.company }}</p>
                  </div>
                  <span class="text-sm text-gray-500 mt-1 md:mt-0">{{ experience.period }}</span>
                </div>
                <p class="text-gray-600 leading-relaxed">{{ experience.description }}</p>
                
                <div v-if="experience.achievements" class="mt-4">
                  <h4 class="font-medium text-gray-900 mb-2">主要成就:</h4>
                  <ul class="list-disc list-inside space-y-1 text-gray-600">
                    <li v-for="achievement in experience.achievements" :key="achievement">
                      {{ achievement }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 教育背景 -->
        <section class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">教育背景</h2>
          <div class="space-y-6">
            <div
              v-for="(education, index) in profile.education"
              :key="index"
              class="bg-gray-50 rounded-lg p-6"
            >
              <div class="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ education.degree }}</h3>
                  <p class="text-blue-600 font-medium">{{ education.school }}</p>
                  <p class="text-gray-600">{{ education.major }}</p>
                </div>
                <span class="text-sm text-gray-500 mt-2 md:mt-0">{{ education.period }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 兴趣爱好 -->
        <section class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">兴趣爱好</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="hobby in profile.hobbies"
              :key="hobby"
              class="bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 transition-colors"
            >
              <Heart class="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span class="text-gray-700 font-medium">{{ hobby }}</span>
            </div>
          </div>
        </section>
      </div>

      <!-- 加载状态 -->
      <div v-else class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">加载个人信息中...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { 
  Mail, 
  MapPin, 
  Heart,
  Code,
  Palette,
  Database,
  Globe,
  Smartphone,
  Settings,
  Github,
  Twitter,
  Linkedin
} from 'lucide-vue-next'
import { useData } from '@/composables/useData'

const { profile, loadProfile } = useData()

// 获取技能图标
const getSkillIcon = (category: string) => {
  const icons: Record<string, any> = {
    frontend: Code,
    backend: Database,
    design: Palette,
    mobile: Smartphone,
    tools: Settings
  }
  return icons[category.toLowerCase()] || Globe
}

onMounted(() => {
  loadProfile()
})
</script>