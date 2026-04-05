/// <reference types="nativewind/types" />

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Platform, Image } from 'react-native';
import { Home, Menu, ShoppingBag, ChevronRight, Plus, Minus, Trash2 } from 'lucide-react-native';

// Mock Data
const MENU_ITEMS = [
  { id: 1, name: 'Double Wagyu', price: 18.99, category: 'Burgers', image: '🍔', desc: 'Premium Wagyu beef.' },
  { id: 2, name: 'Truffle Pizza', price: 22.99, category: 'Pizza', image: '🍕', desc: 'Wild mushrooms.' },
  { id: 3, name: 'Craft Cola', price: 4.99, category: 'Drinks', image: '🥤', desc: 'Artisanal cola.' },
  { id: 4, name: 'Truffle Fries', price: 8.99, category: 'Burgers', image: '🍟', desc: 'Crispy fries.' },
  { id: 5, name: 'Gold Ice Cream', price: 12.99, category: 'Dessert', image: '🍦', desc: '24k gold.' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'menu' | 'cart'>('home');
  const [cart, setCart] = useState<{ item: typeof MENU_ITEMS[0]; quantity: number }[]>([]);

  const addToCart = (item: typeof MENU_ITEMS[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <ScrollView className="flex-1 bg-white">
            <View className="p-6 pt-12">
              <Text className="text-secondary-400 font-medium">Good Morning,</Text>
              <Text className="text-3xl font-bold text-secondary-900 mb-8">Hungry?</Text>

              <View className="bg-secondary-900 rounded-3xl p-6 mb-8 shadow-xl shadow-secondary-900/20">
                <Text className="text-primary-500 font-bold mb-2">Featured</Text>
                <Text className="text-3xl font-bold text-white mb-4">Wagyu Burger</Text>
                <Text className="text-secondary-400 mb-6">Experience the ultimate taste of luxury.</Text>
                <TouchableOpacity
                  className="bg-primary-500 py-3 px-6 rounded-xl self-start"
                  onPress={() => setCurrentScreen('menu')}
                >
                  <Text className="text-white font-bold">Order Now</Text>
                </TouchableOpacity>
              </View>

              <Text className="text-xl font-bold text-secondary-900 mb-4">Popular</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4 pl-1">
                {MENU_ITEMS.slice(0, 3).map(item => (
                  <TouchableOpacity key={item.id} className="bg-gray-50 p-4 rounded-2xl w-40 border border-gray-100" onPress={() => addToCart(item)}>
                    <Text className="text-4xl mb-4 text-center">{item.image}</Text>
                    <Text className="font-bold text-secondary-900 mb-1">{item.name}</Text>
                    <Text className="text-primary-500 font-bold">${item.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        );
      case 'menu':
        return (
          <View className="flex-1 bg-gray-50">
            <View className="bg-white p-6 pt-12 pb-4 shadow-sm z-10">
              <Text className="text-2xl font-bold text-secondary-900">Menu</Text>
            </View>
            <ScrollView className="p-4">
              {MENU_ITEMS.map((item) => (
                <View key={item.id} className="bg-white p-4 rounded-2xl mb-4 flex-row items-center shadow-sm">
                  <View className="w-20 h-20 bg-gray-100 rounded-xl items-center justify-center mr-4">
                    <Text className="text-4xl">{item.image}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-lg text-secondary-900">{item.name}</Text>
                    <Text className="text-gray-500 text-sm mb-2">{item.desc}</Text>
                    <Text className="text-primary-500 font-bold">${item.price}</Text>
                  </View>
                  <TouchableOpacity
                    className="bg-secondary-900 p-3 rounded-full"
                    onPress={() => addToCart(item)}
                  >
                    <Plus size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
              <View className="h-24" />
            </ScrollView>
          </View>
        );
      case 'cart':
        const total = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
        return (
          <View className="flex-1 bg-white">
            <View className="p-6 pt-12 border-b border-gray-100">
              <Text className="text-2xl font-bold text-secondary-900">My Order</Text>
            </View>
            <ScrollView className="flex-1 p-6">
              {cart.length === 0 ? (
                <View className="items-center justify-center mt-20">
                  <ShoppingBag size={64} color="#CBD5E1" />
                  <Text className="text-secondary-400 mt-4 text-lg">Your cart is empty</Text>
                </View>
              ) : (
                cart.map((lineItem) => (
                  <View key={lineItem.item.id} className="flex-row items-center py-4 border-b border-gray-100">
                    <Text className="text-2xl mr-4">{lineItem.item.image}</Text>
                    <View className="flex-1">
                      <Text className="font-bold text-secondary-900">{lineItem.item.name}</Text>
                      <Text className="text-gray-500">${lineItem.item.price}</Text>
                    </View>
                    <View className="flex-row items-center bg-gray-100 rounded-full px-2">
                      <TouchableOpacity className="p-2" onPress={() => removeFromCart(lineItem.item.id)}>
                        <Minus size={16} color="#0F172A" />
                      </TouchableOpacity>
                      <Text className="mx-2 font-bold">{lineItem.quantity}</Text>
                      <TouchableOpacity className="p-2" onPress={() => addToCart(lineItem.item)}>
                        <Plus size={16} color="#0F172A" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
            {cart.length > 0 && (
              <View className="p-6 bg-white border-t border-gray-100 pb-10">
                <View className="flex-row justify-between mb-4">
                  <Text className="text-gray-500">Total</Text>
                  <Text className="text-2xl font-bold text-secondary-900">${total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity className="bg-primary-500 py-4 rounded-2xl items-center shadow-lg shadow-primary-500/30">
                  <Text className="text-white font-bold text-lg">Checkout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      {renderScreen()}

      {/* Bottom Nav */}
      <View className="flex-row justify-between bg-white border-t border-gray-100 px-8 py-4 pb-8 absolute bottom-0 w-full">
        <TouchableOpacity onPress={() => setCurrentScreen('home')} className="items-center">
          <Home size={24} color={currentScreen === 'home' ? '#F97316' : '#94A3B8'} />
          <Text className={currentScreen === 'home' ? 'text-primary-500 text-xs font-bold mt-1' : 'text-gray-400 text-xs mt-1'}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('menu')} className="items-center">
          <Menu size={24} color={currentScreen === 'menu' ? '#F97316' : '#94A3B8'} />
          <Text className={currentScreen === 'menu' ? 'text-primary-500 text-xs font-bold mt-1' : 'text-gray-400 text-xs mt-1'}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentScreen('cart')} className="items-center relative">
          <View>
            <ShoppingBag size={24} color={currentScreen === 'cart' ? '#F97316' : '#94A3B8'} />
            {cart.length > 0 && (
              <View className="absolute -top-1 -right-1 bg-primary-500 w-4 h-4 rounded-full items-center justify-center border border-white">
                <Text className="text-white text-[10px] font-bold">{cart.reduce((a, b) => a + b.quantity, 0)}</Text>
              </View>
            )}
          </View>
          <Text className={currentScreen === 'cart' ? 'text-primary-500 text-xs font-bold mt-1' : 'text-gray-400 text-xs mt-1'}>Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
